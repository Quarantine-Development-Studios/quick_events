import firebase from './firebase';
import {collectionData} from 'rxfire/firestore';
import {tap} from 'rxjs/operators';

const clientsRef = firebase.firestore().collection('clients');


export default collectionData(clientsRef, 'id')