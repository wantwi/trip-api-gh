const router = require("express").Router();
const peopleController = require("../controllers/peopleController.js");
const {
  userAuthentication,
  userAuthorizeRoles,
} = require("../middleware/auth.js");
const upload = require("../utils/upload");

router.get(
  "/persons/:memberType",
  userAuthentication,
  peopleController.getPersonByQuery
);

router.get(
  "/person/:memberType/:id",
  userAuthentication,
  peopleController.getPersonById
);

router.post(
  "/person/:memberType",
  userAuthentication,
  upload.single("image"),
  peopleController.addPerson
);

router.put(
  "/person/:id",
  userAuthentication,
  peopleController.updatePerson
);

router.delete(
  "/person/:id",
  userAuthentication,
  userAuthorizeRoles("admin"),
  peopleController.removePerson
);

module.exports = router;
