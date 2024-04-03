import { Router } from "express";

import { dirname } from "path";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
let __dirname = dirname('./brainbrowser/examples/js');
__dirname += '/js'


const router = Router();


router.route("/brainbrowser/workers//deindex.worker.js").get(async (req, res) => {
    res.sendFile('brainbrowser/workers//deindex.worker.js',  {root : __dirname})
});

router.route("/brainbrowser/workers//wireframe.worker.js").get(async (req, res) => {
    res.sendFile('brainbrowser/workers//wireframe.worker.js',  {root : __dirname})
});

router.route("/brainbrowser/workers//json.worker.js").get(async (req, res) => {
    res.sendFile('brainbrowser/workers//json.worker.js',  {root : __dirname})
});

router.route("/brainbrowser/workers//mniobj.worker.js").get(async (req, res) => {
    res.sendFile('brainbrowser/workers//mniobj.worker.js',  {root : __dirname})
});

router.route("/brainbrowser/workers//wavefrontobj.worker.js").get(async (req, res) => {
    res.sendFile('brainbrowser/workers//wavefrontobj.worker.js',  {root : __dirname})
});

router.route("/brainbrowser/workers//freesurferbin.worker.js").get(async (req, res) => {
    res.sendFile('brainbrowser/workers//freesurferbin.worker.js',  {root : __dirname})
});

router.route("/brainbrowser/workers//freesurferasc.worker.js").get(async (req, res) => {
    res.sendFile('brainbrowser/workers//freesurferasc.worker.js',  {root : __dirname})
});

router.route("/brainbrowser/workers//gifti.worker.js").get(async (req, res) => {
    res.sendFile('brainbrowser/workers//gifti.worker.js',  {root : __dirname})
});

router.route("/brainbrowser/workers//text.intensity.worker.js").get(async (req, res) => {
    res.sendFile('brainbrowser/workers//text.intensity.worker.js',  {root : __dirname})
});

router.route("/brainbrowser/workers//freesurferbin.intensity.worker.js").get(async (req, res) => {
    res.sendFile('brainbrowser/workers//freesurferbin.intensity.worker.js',  {root : __dirname})
});

router.route("/brainbrowser/workers//freesurferasc.intensity.worker.js").get(async (req, res) => {
    res.sendFile('brainbrowser/workers//freesurferasc.intensity.worker.js',  {root : __dirname})
});

router.route("/brainbrowser/workers//gifti.worker.js").get(async (req, res) => {
    res.sendFile('brainbrowser/workers//gifti.worker.js',  {root : __dirname})
});





// router.route("/").get(async (req, res) => {
//     res.sendFile('',  {root : __dirname})
// });


export default router