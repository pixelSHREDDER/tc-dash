import axios from 'axios';
import { URLS } from '../conf';
import auth0Client from '../Auth';

let isCheckingSession;
let isLive;

class Instance {
  constructor() {
    this.data = {
      onboarding_progress: {},
    };
    isLive = false;
    //isCheckingSession = true;
  }

  // Experimentally moved out of App.js, seems to work so far
  componentDidUpdate() { this.forceUpdate() }

  init = async () => {
    let instanceId = null;

    try {
      await auth0Client.renewTokens();
      //this.forceUpdate();
      instanceId = await auth0Client.getProfile().sub;
      this.getData(instanceId);
      //isCheckingSession = false;
    /*try {
      await auth0Client.checkSession();
      instanceId = await auth0Client.getProfile().sub;
      this.forceUpdate();
      this.getInstance(instanceId);*/
      /* older
      if (!this.state.intervalIsSet) {
        let interval = setInterval(this.getInstance(instanceId), 1000);
        this.setState({ intervalIsSet: interval });
      }*/
      //isCheckingSession = false;
      /* older
      this.refreshInstance();*/
    } catch (err) {
      console.error(err);
      //isCheckingSession = false;
      /*if (err.error !== 'login_required') console.log(err.error);
      isCheckingSession = false;*/
    }
    //isCheckingSession = false;
  }

  getData = async (owner) => {
    const token = await auth0Client.getIdToken();
    const data = (await axios.get(`http://${URLS.dataUrl}/instance/${owner}`,
    { headers: { 'Authorization': `Bearer ${token}` }}
    )).data;
    this.data = data.data[0];
    //TODO: Add isLive setting based on data
  };

  updateData = async (owner, update) => {
    try {
      const token = await auth0Client.getIdToken();
      /*let objOwnerToUpdate = null;
      this.state.instances.forEach(ins => {
        if (ins.owner == ownerToUpdate) {
          objOwnerToUpdate = ins.owner;
        }
      });*/

      this.data = (await axios.post(`http://${ URLS.dataUrl }/updateInstance/${ owner }`,
        { data: update },
        { headers: { 'Authorization': `Bearer ${ token }` }}
      )).data.data;
    } catch (err) {
      console.log(err);
      //if (err.response.status===401 && err.config) {

      //}
    }
  };
}

const instance = new Instance();

export default instance;
export { isCheckingSession, isLive };