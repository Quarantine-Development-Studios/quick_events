import firebase from './firebase';
import {collectionData} from 'rxfire/firestore';
import {tap} from 'rxjs/operators';

const inquiriesRef = firebase.firestore().collection('inquiries');


export default collectionData(inquiriesRef, 'id')