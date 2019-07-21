import axios from 'axios';
import {
  GET_INSTANCE,
  TOGGLE_ISLIVE,
  TOGGLE_LOADING,
  UPDATE_INSTANCE
} from './types';
import { URLS } from '../../conf';
import auth0Client from '../../Auth';

export const getInstance = () => async (dispatch) => {
    let instanceId = null;
    let token = null;
    let data = {};

    try {
        await auth0Client.renewTokens();
        //this.forceUpdate();
        instanceId = await auth0Client.getProfile().sub;
        token = await auth0Client.getIdToken();
        data = (await axios.get(`http://${ URLS.dataUrl }/instance/${ instanceId }`,
        { headers: { 'Authorization': `Bearer ${ token }`}}
        )).data;
        //this.data = data.data[0];
        console.log(data);
        dispatch({
            type: GET_INSTANCE,
            payload: data.data[0]
        });
        dispatch({
            type: TOGGLE_ISLIVE,
            payload: false
        });
        dispatch({
            type: TOGGLE_LOADING,
            payload: false
        });
    } catch (err) {
        console.error(err);
    }
}

export const updateInstance = (instanceId, update) => async (dispatch) => {
  try {
    const token = await auth0Client.getIdToken();
    let data = (await axios.post(`http://${ URLS.dataUrl }/updateInstance/${ instanceId }`,
      { data: update },
      { headers: { 'Authorization': `Bearer ${ token }` }}
    )).data.data;
    console.log(data);
    dispatch({
        type: UPDATE_INSTANCE,
        payload: data
    });
  } catch (err) {
    console.log(err);
    //if (err.response.status===401 && err.config) {

    //}
  }
};

/*async getInstances() {
    const token = await auth0Client.getIdToken();
    const data = (await axios.get(`http://${ URLS.dataUrl }/getData`,
    { headers: { 'Authorization': `Bearer ${ token }` }}
    )).data;
    console.log(data);*/
    /*fetch(`http://${ URLS.dataUrl }/getData`, {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',  
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(data => data.json())*/
      /*.then(res => this.setState({
        instances: res.data
      }));*/
      /*.then((res) => console.log(res.data));*/
  /*};

  async addInstance(instance) {
    const token = await auth0Client.getIdToken();*/
    //const owner = instance.owner;
    /*let currentIds = this.state.instances.map(data => data.id);
      let idToBeAdded = 0;
      while (currentIds.includes(idToBeAdded)) {
        ++idToBeAdded;
      }*/
      /*axios.post(`http://${ URLS.dataUrl }/addInstance`, instance,
        {headers: { 'Authorization': `Bearer ${ token }` }}
      );
  };

  async deleteInstance(owner) {
    const token = await auth0Client.getIdToken();*/
    /*let objOwnerToDelete = null;
    this.state.instances.forEach(ins => {
      if (ins.owner == owner) {
        objOwnerToDelete = ins.owner;
      }
    });*/

    /*axios.delete(`http://${ URLS.dataUrl }/deleteInstance`, {
      data: {
        //owner: objOwnerToDelete
        owner: owner
      },
      headers: { 'Authorization': `Bearer ${ token }` }}
    );
  };*/

  /*async refreshInstance() {
    try {
      const token = await auth0Client.getIdToken();
      const id = await auth0Client.getProfile().sub;
      //const instance = (await axios.get(`http://${ URLS.dataUrl }/${ params.instanceId }`)).data;
      const instance = (await axios.get(`http://${ URLS.dataUrl }/${ id }`, {
        //headers: { 'Authorization': `Bearer ${ auth0Client.getIdToken() }` }
        headers: { 'Authorization': `Bearer ${ token }` }
      })).data;
      this.setState({
          instance,
      });
    } catch (err) {
      //console.log(err.config);
      if (err.response.status===401 && err.config) {

      }
    }
  }*/

  /*async saveInstance(instance) {
    console.log(instance);
    await axios.put(`http://${ URLS.dataUrl }/${ instance.id }`, {
      instance,
    }, {
      headers: { 'Authorization': `Bearer ${ auth0Client.getIdToken() }` }
    });*/
    /*this.setState({
      instance,
     });*/
    /*await this.refreshInstance();
  }*/

  /*handleChange = event => {
    this.setState({ auth: event.target.checked });
  };*/
