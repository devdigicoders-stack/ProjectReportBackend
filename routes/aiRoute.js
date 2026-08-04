// routes/geminiRoute.js
import express from "express";
import { genIntro ,genprojectGoals,gensystemAnalysis,gencoreFeatures,gensystemArchitecture,gensystemDesign,genbackendDesign,gendataModeling,genconclusion} from "../controllers/aiController.js";

const router = express.Router();

router.post("/intro", genIntro);
router.post("/projectGoals", genprojectGoals);
router.post("/systemAnalysis", gensystemAnalysis);
router.post("/coreFeatures", gencoreFeatures);
router.post("/systemArchitecture", gensystemArchitecture);
router.post("/systemDesign", gensystemDesign);
router.post("/backendDesign", genbackendDesign);
router.post("/dataModeling", gendataModeling);
router.post("/conclusion", genconclusion);

export default router;
