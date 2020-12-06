import firebase from './firebase';
import {collectionData} from 'rxfire/firestore';

const clientsRef = firebase.firestore().collection('clients');


export default collectionData(clientsRef, 'id')