"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidHttpUrl =
  exports.generateYoutubeHtmlFromVideoId =
  exports.generateYoutubeHtmlFromUrl =
  exports.generateCardHtml =
  exports.generateTweetHtml =
    void 0;
var utils_1 = require("markdown-it/lib/common/utils");
var url_matcher_1 = require("./url-matcher");
function generateTweetHtml(url) {
  return '<div class="embed-tweet"><embed-tweet src="'.concat(
    url,
    '"></embed-tweet></div>'
  );
}
exports.generateTweetHtml = generateTweetHtml;
function generateCardHtml(url) {
  return '<iframe title="page card" class="m-auto w-full" src="https://hatenablog-parts.com/embed?url='.concat(
    encodeURIComponent(url),
    '" frameborder="0" scrolling="no" loading="lazy"></iframe></div>'
  );
}
exports.generateCardHtml = generateCardHtml;
function generateYoutubeHtml(videoId, start) {
  var escapedVideoId = (0, utils_1.escapeHtml)(videoId);
  // 48時間以内
  var time = Math.min(Number(start || 0), 48 * 60 * 60);
  var startQuery = time ? "&start=".concat(time) : "";
  return '<div class="embed-youtube"><iframe title="youtube card" src="https://www.youtube.com/embed/'
    .concat(escapedVideoId, "?loop=1&playlist=")
    .concat(escapedVideoId)
    .concat(startQuery, '" allowfullscreen loading="lazy"></iframe></div>');
}
function generateYoutubeHtmlFromUrl(url) {
  var params = (0, url_matcher_1.extractYoutubeVideoParameters)(url);
  if (!params) {
    return generateCardHtml(url);
  } else {
    return generateYoutubeHtml(params.videoId, params.start);
  }
}
exports.generateYoutubeHtmlFromUrl = generateYoutubeHtmlFromUrl;
function generateYoutubeHtmlFromVideoId(videoId) {
  return generateYoutubeHtml(videoId);
}
exports.generateYoutubeHtmlFromVideoId = generateYoutubeHtmlFromVideoId;
function isValidHttpUrl(str) {
  try {
    var url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
}
exports.isValidHttpUrl = isValidHttpUrl;
