import { vueAuthenticate } from "@/main";

const getters = {
  isAuthenticated: () => vueAuthenticate.isAuthenticated(),
}

export default getters