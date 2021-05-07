import { observable, action } from "mobx";
import { createContext } from "react";
import {
  getUserInfoService,
  getStaffInfoService,
  updateProfileService,
  changePasswordService,
  myInboxService,
  acceptRejectService,
  myInvitationsService,
  addCardService,
  getProductPlansService,
  updateCardDetailsService,
  getPaymentMethodService,
  handlePaymentService,
} from "services/user.service";
import { errorToast, successToast } from "./../utils";

class authStore {
  @observable
  userInfo = null;
  @observable
  staffInfo = null;
  @observable
  myInbox = null;
  @observable
  productPlan = null;

  @action
  getUserInfo = async () => {
    try {
      const response = await getUserInfoService();
      this.userInfo = response;
      return response;
    } catch (err) {
      console.log("[ERROR] in getUserInfo in authStore", err);
      throw new Error(err);
    }
  };

  getStaffInfo = async () => {
    try {
      const response = await getStaffInfoService();
      this.staffInfo = response;
    } catch (err) {
      console.log("[ERROR] in getStaffInfo in authStore", err);
      throw new Error(err);
    }
  };

  updateProfile = async (data) => {
    try {
      const response = await updateProfileService(data);
      const { message, status } = response;
      if (status) {
        successToast(message);
      } else {
        errorToast(message);
      }
    } catch (err) {
      console.log("[ERROR] in updateProfile in authStore", err);
      throw new Error(err);
    }
  };

  changePassword = async (data) => {
    try {
      const response = await changePasswordService(data);
      const { message, status } = response;
      if (status) {
        successToast(message);
      } else {
        errorToast(message);
      }
    } catch (err) {
      console.log("[ERROR] in changePassword in authStore", err);
      throw new Error(err);
    }
  };

  getMyInbox = async (data) => {
    try {
      const response = await myInboxService(data);
      return response;
      this.myInbox = response;
    } catch (err) {
      console.log("[ERROR] in getMyInbox in authStore", err);
      throw new Error(err);
    }
  };

  getMyInvitations = async (data) => {
    try {
      const response = await myInvitationsService(data);
      return response;
      this.myInbox = response;
    } catch (err) {
      console.log("[ERROR] in getMyInvitations in authStore", err);
      throw new Error(err);
    }
  };

  acceptRejectUser = async (data) => {
    try {
      const response = await acceptRejectService(data);
    } catch (err) {
      console.log("[ERROR] in changePassword in authStore", err);
      throw new Error(err);
    }
  };

  addCard = async (data) => {
    try {
      const response = await addCardService(data);
      return response?.data;
    } catch (err) {
      console.log("[ERROR] in addCard in authStore", err);
      throw new Error(err);
    }
  };

  getPaymentMethod = async (data) => {
    try {
      const response = await getPaymentMethodService(data);
      return response?.data;
    } catch (err) {
      console.log("[ERROR] in getPaymentMethod in authStore", err);
      throw new Error(err);
    }
  };

  @action
  getProductPlans = async () => {
    try {
      const response = await getProductPlansService();
      this.productPlan = response;
    } catch (err) {
      console.log("[ERROR] in getProductPlans in authStore", err);
      throw new Error(err);
    }
  };

  updateCardDetails = async (data) => {
    try {
      const response = await updateCardDetailsService(data);
    } catch (err) {
      console.log("[ERROR] in updateCardDetails in authStore", err);
      throw new Error(err);
    }
  };

  handlePayment = async (data) => {
    try {
      const response = await handlePaymentService(data);
      response?.status &&
        successToast("your payment has been received successfully");
    } catch (err) {
      console.log("[ERROR] in handlePayment in authStore", err);
      throw new Error(err);
    }
  };
}

export const authStore = createContext(new authStore());
