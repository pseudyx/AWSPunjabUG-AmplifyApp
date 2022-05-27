import { Amplify, Auth } from 'aws-amplify';
import awsExport from '../aws-exports';

Amplify.configure(awsExport);

class AuthRepo {
    constructor(){

    }

    async getUser() {
        let data;

        try{
            data = await Auth.currentAuthenticatedUser();
        } catch (ex){
            data = null;
        }
        return { ...data };
    }
}

export default AuthRepo;