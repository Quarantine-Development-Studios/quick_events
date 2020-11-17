import firebase from './firebase';
import {collectionData} from 'rxfire/firestore';

const inquiriesRef = firebase.firestore().collection('inquiries');


export default collectionData(inquiriesRef, 'id')