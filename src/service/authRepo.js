import { Amplify, Auth } from 'aws-amplify';
import awsExport from '../aws-exports';

Amplify.configure(awsExport);

export default class AuthRepo {
    
    static async login(username, password){
        return Auth.signIn(username, password);
        // add user to session.
    }

    static async logout(){
        //remove user from session.
        return Auth.signOut();
    }

    static async getUser() {
        let data;

        try{
            data = await Auth.currentAuthenticatedUser();
        } catch (ex){
            data = null;
        }
        return { ...data };
    }
}
