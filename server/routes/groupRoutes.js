import express from "express";
import {
  createGroup,
  addMemberToGroup,
  removeMemberFromGroup,
  getAllGroups,
  joinGroup,
  leaveGroup,
  getGroupData,
  getGroupMembers,
  assignUserAsAdmin,
} from "../controllers/groupControllers.js";
import { authorizeUser } from "../middleware/express/userAuthorization.js";
import { validator } from "../middleware/express/validator.js";
import { validateGroupRules } from "../middleware/express/groupSanitizer.js";

const router = express.Router();

// Protected endpoint
router.use(authorizeUser);

router.post(
  "/create-group/:userId",
  validateGroupRules,
  validator,
  createGroup
);

router.get("/get-groups", getAllGroups);
router.get("/get-group-data/:groupId/:userId", getGroupData);
router.get("/get-members/:groupId/:userId", getGroupMembers);
router.patch("/join-group/:userId", joinGroup);
router.patch("/leave-group/:groupId/:userId", leaveGroup);

// Protected endpoint with admin rights
router.patch("/add-member/:groupId/:userId", addMemberToGroup);
router.patch("/remove-member/:groupId/:adminId/:userId", removeMemberFromGroup);
router.patch("/add-new-admin/:groupId/:adminId/:userId", assignUserAsAdmin);

export default router;
