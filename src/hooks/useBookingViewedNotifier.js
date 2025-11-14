// src/hooks/useBookingViewedNotifier.js
import { useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const useBookingViewedNotifier = (userId) => {
  useEffect(() => {
    if (!userId) return; 

    const q = query(collection(db, 'bookings'), where('userId', '==', userId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        
        if (change.type === 'modified') {
          const updatedBooking = change.doc.data();
          
          
          if (updatedBooking.status === 'viewed') {
            
            
            await addDoc(collection(db, 'notifications'), {
              userId: userId, 
              title: 'your booking has been viewed',
              message: 'Your booking request has been reviewed by our team. We will contact you shortly.',
              icon: 'task_alt',
              read: false,
              createdAt: serverTimestamp(),
              bookingId: change.doc.id,
            });

            
            if ('Notification' in window && Notification.permission === 'granted') {
               new Notification('Booking Viewed', {
                 body: 'Will contact you shortly.',
               });
            }
          }
        }
      });
    });

    return () => unsubscribe();
  }, [userId]);
};

export default useBookingViewedNotifier;