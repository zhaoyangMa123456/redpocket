import Vue from 'vue'
import VueSorce from 'vue-resource'
Vue.use(VueSorce);
import { onlineUrl } from '../config/env'

export const getList = (URL)=>{
  Vue.http.get(URL).then(
    (successData) => {
      if(successData.body.state == 1){
        return successData.body;
        console.log()

      }else{
        return successData.body;
      }
      this.canopenAll = true;
      this.loading = false;
    },
    (fileData) => {console.log(fileData);}
  );

}


export default async(url='',data={},type='GET')=>{
  type = type.toUpperCase();





}










