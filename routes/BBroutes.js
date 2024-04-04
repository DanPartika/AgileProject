import { Router } from "express";

import { dirname } from "path";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
let __dirname = dirname('./brainbrowser/examples');
__dirname += '/examples'


const router = Router();

router.route("/js/jquery-1.6.4.min.js").get(async (req, res) => {
    res.sendFile('js/jquery-1.6.4.min.js',  {root : __dirname})
});

router.route("/js/jquery-ui-1.8.10.custom.min.js").get(async (req, res) => {
    res.sendFile('js/jquery-ui-1.8.10.custom.min.js',  {root : __dirname})
});

router.route("/css/ui-darkness/jquery-ui-1.8.10.custom.css").get(async (req, res) => {
    res.sendFile('css/ui-darkness/jquery-ui-1.8.10.custom.css',  {root : __dirname})
});

router.route("/css/common.css").get(async (req, res) => {
    res.sendFile('css/common.css',  {root : __dirname})
});

router.route("/css/surface-viewer-demo.css").get(async (req, res) => {
    res.sendFile('css/surface-viewer-demo.css',  {root : __dirname})
});

router.route("/img/ajax-loader.gif").get(async (req, res) => {
    res.sendFile('img/ajax-loader.gif',  {root : __dirname})
});

router.route("/js/ui.js").get(async (req, res) => {
    res.sendFile('js/ui.js',  {root : __dirname})
});

router.route("/js/pako.js").get(async (req, res) => {
    res.sendFile('js/pako.js',  {root : __dirname})
});

router.route("/js/brainbrowser/brainbrowser.js").get(async (req, res) => {
    res.sendFile('js/brainbrowser/brainbrowser.js',  {root : __dirname})
});

router.route("/js/brainbrowser/core/tree-store.js").get(async (req, res) => {
    res.sendFile('js/brainbrowser/core/tree-store.js',  {root : __dirname})
});

router.route("/js/brainbrowser/lib/config.js").get(async (req, res) => {
    res.sendFile('js/brainbrowser/lib/config.js',  {root : __dirname})
});

router.route("/js/brainbrowser/lib/utils.js").get(async (req, res) => {
    res.sendFile('js/brainbrowser/lib/utils.js',  {root : __dirname})
});

router.route("/js/brainbrowser/lib/events.js").get(async (req, res) => {
    res.sendFile('js/brainbrowser/lib/events.js',  {root : __dirname})
});

router.route("/js/brainbrowser/lib/loader.js").get(async (req, res) => {
    res.sendFile('js/brainbrowser/lib/loader.js',  {root : __dirname})
});

router.route("/js/brainbrowser/lib/color-map.js").get(async (req, res) => {
    res.sendFile('js/brainbrowser/lib/color-map.js',  {root : __dirname})
});

router.route("/js/brainbrowser/surface-viewer.js").get(async (req, res) => {
    res.sendFile('js/brainbrowser/surface-viewer.js',  {root : __dirname})
});

router.route("/js/brainbrowser/surface-viewer/lib/three.js").get(async (req, res) => {
    res.sendFile('js/brainbrowser/surface-viewer/lib/three.js',  {root : __dirname})
});

router.route("/js/brainbrowser/surface-viewer/lib/parse-intensity-data.js").get(async (req, res) => {
    res.sendFile('js/brainbrowser/surface-viewer/lib/parse-intensity-data.js',  {root : __dirname})
});

router.route("/js/brainbrowser/surface-viewer/modules/annotations.js").get(async (req, res) => {
    res.sendFile('js/brainbrowser/surface-viewer/modules/annotations.js',  {root : __dirname})
});

router.route("/js/brainbrowser/surface-viewer/modules/color.js").get(async (req, res) => {
    res.sendFile('js/brainbrowser/surface-viewer/modules/color.js',  {root : __dirname})
});

router.route("/js/brainbrowser/surface-viewer/modules/loading.js").get(async (req, res) => {
    res.sendFile('js/brainbrowser/surface-viewer/modules/loading.js',  {root : __dirname})
});

router.route("/js/brainbrowser/surface-viewer/modules/rendering.js").get(async (req, res) => {
    res.sendFile('js/brainbrowser/surface-viewer/modules/rendering.js',  {root : __dirname})
});

router.route("/js/brainbrowser/surface-viewer/modules/views.js").get(async (req, res) => {
    res.sendFile('js/brainbrowser/surface-viewer/modules/views.js',  {root : __dirname})
});

router.route("/surface-viewer-demo.config.js").get(async (req, res) => {
    res.sendFile('surface-viewer-demo.config.js',  {root : __dirname})
});

router.route("/js/AnaglyphEffect.js").get(async (req, res) => {
    res.sendFile('js/AnaglyphEffect.js',  {root : __dirname})
});

router.route("/surface-viewer-demo.js").get(async (req, res) => {
    res.sendFile('surface-viewer-demo.js',  {root : __dirname})
});

router.route("/css/ui-darkness/images/ui-bg_glass_20_555555_1x400.png.js").get(async (req, res) => {
    res.sendFile('css/ui-darkness/images/ui-bg_glass_20_555555_1x400.png',  {root : __dirname})
});

router.route("/models/atlas-labels.txt").get(async (req, res) => {
    res.sendFile('models/atlas-labels.txt',  {root : __dirname})
});




export default router