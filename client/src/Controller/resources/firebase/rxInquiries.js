import firebase from './firebase.mjs';
import {collectionData} from 'rxfire/firestore';

const inquiriesRef = firebase.firestore().collection('inquiries');


export default collectionData(inquiriesRef, 'id')