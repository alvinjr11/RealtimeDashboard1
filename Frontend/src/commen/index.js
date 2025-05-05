
const backendDomain = import.meta.env.VITE_BACKEND_URL

const SummaryApi = {
  signUP: {
    url: `${backendDomain}/auth/signup`,
    method: "post"
  },
  verifyotp: {
    url: `${backendDomain}/auth/verify-otp`,
    method: "post"
  },
  login: {
    url: `${backendDomain}/auth/login`,
    method: "post"
  },

  currentUser: {
    url: `${backendDomain}/auth/profile`,
    method: "get"
  },
  logout_user: {
    url: `${backendDomain}/auth/userLogout`,
    method: "get"
  },
  simulatorStart: {
    url: `${backendDomain}/simulator/start`,
    method: "post"
  },
  simulatorStop: {
    url: `${backendDomain}/simulator/stop`,
    method: "post"
  },
  flowSave: {
    url: `${backendDomain}/flow/save`,
    method: "post",
  },
  getFlow: {
    // Append userId dynamically in the frontend when making the request
    url: `${backendDomain}/flow/`,
    method: "get",
  },
  addNode: {
    url: `${backendDomain}/flow/add-node`,
    method: "post",
  },
  deleteNode: {
    url: `${backendDomain}/flow/delete-node`,
    method: "post",
  }

}
export default SummaryApi