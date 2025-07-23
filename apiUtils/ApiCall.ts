import { District } from "@/types";
import RemoteApiUtils from "./RemoteApiUtils";

class ApiCall{

static async postDistrictRequest(district:District): Promise<Response>{
   return RemoteApiUtils.postData('/postDistrictInfo',district)
}

static async getAllDistrict(): Promise<Response>{
   return RemoteApiUtils.getData('/getAllDistrict')
}
}

export default ApiCall;