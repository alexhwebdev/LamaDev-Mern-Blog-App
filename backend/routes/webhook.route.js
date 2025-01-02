import express from "express";
import { clerkWebHook } from "../controllers/webhook.controller.js";
import bodyParser from "body-parser";

const router = express.Router();

// 2:50 mark
router.post(
  "/clerk",
  bodyParser.raw({ type: "application/json" }), // to parse our Payload
  clerkWebHook
);

export default router;

/* ---------- NOTES
- When req is made to "/clerk",
- check req signature, decrypt it using web hook secret,
- if everything is good, means that req came from Clerk

- Verify req signature with "Svix"
- req with include Payload and Headers




  'bodyParser':
    - For forms, 
    - to parse the info coming through the form on our site.

*/