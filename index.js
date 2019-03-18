module.exports = function fetchJson(url, body, headers = {}) {
  const fetcher =
    typeof fetch !== "undefined" ? fetch : require("isomorphic-unfetch");

  return fetcher(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers
    },
    method: body ? "post" : "get",
    body: body ? JSON.stringify(body) : null
  }).then(res => {
    if (!res.ok) {
      throw new Error(`Server error: ${res.status}, ${res.statusText}`);
    }
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Not JSON response type");
    }

    return res.json();
  });
};
