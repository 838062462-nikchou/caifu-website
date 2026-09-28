// Cloudflare Pages Functions - 上传 API
// 文件：functions/api/upload.js
// 用途：接收上传 + 保存到 R2 + 触发报告

export async function onRequestPost(context) {
  const { request, env } = context;

  // CORS
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "no file" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!file.name.toLowerCase().endsWith(".xlsx")) {
      return new Response(JSON.stringify({ error: "must be .xlsx" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const buffer = await file.arrayBuffer();
    const sizeKB = Math.round(buffer.byteLength / 1024);

    // Cloudflare Workers 100MB 限制
    if (buffer.byteLength > 100 * 1024 * 1024) {
      return new Response(
        JSON.stringify({
          error: "file too large (>100MB)",
          size_mb: Math.round(buffer.byteLength / 1024 / 1024),
        }),
        { status: 413, headers: { "Content-Type": "application/json" } }
      );
    }

    // 保存到 R2
    if (env.R2_BUCKET) {
      await env.R2_BUCKET.put(
        `caifu_data_${Date.now()}.xlsx`,
        buffer,
        {
          httpMetadata: { contentType: file.type },
          customMetadata: { originalName: file.name },
        }
      );
    }

    // 触发报告生成 webhook
    if (env.REPORT_WEBHOOK) {
      await fetch(env.REPORT_WEBHOOK, {
        method: "POST",
        body: JSON.stringify({
          filename: file.name,
          size_kb: sizeKB,
        }),
      }).catch(() => {});
    }

    return new Response(
      JSON.stringify({
        success: true,
        filename: file.name,
        size_kb: sizeKB,
        message: `上传成功！${sizeKB} KB`,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}