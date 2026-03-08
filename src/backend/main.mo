import AccessControl "./authorization/access-control";
import MixinAuthorization "./authorization/MixinAuthorization";

actor Main {
  // Authorization state
  let accessControlState : AccessControl.AccessControlState = AccessControl.initState();

  include MixinAuthorization(accessControlState);
}
