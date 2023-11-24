import express from "express";
import {
  createGroup,
  addMemberToGroup,
  removeMemberFromGroup,
  getAllGroups,
  deleteGroupById,
  joinGroup,
  leaveGroup,
  getGroupData,
} from "../controllers/groupControllers.js";
import { authorizeUser } from "../middleware/userAuthorization.js";
import { validator } from "../middleware/validator.js";
import { validateGroupRules } from "../middleware/groupSanitizer.js";
import { isGroupAdminMiddleware } from "../middleware/isGroupAdminMiddleware.js";

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
router.patch("/join-group/:userId", joinGroup);
router.patch("/leave-group/:groupId/:userId", leaveGroup);

// Protected endpoint with admin rights
router.patch(
  "/add-member/:groupId/:userId",
  isGroupAdminMiddleware,
  addMemberToGroup
);
router.patch(
  "/remove-member/:groupId/:userId",
  isGroupAdminMiddleware,
  removeMemberFromGroup
);
router.delete(
  "/delete/:groupId/:userId",
  isGroupAdminMiddleware,
  deleteGroupById
);

export default router;
