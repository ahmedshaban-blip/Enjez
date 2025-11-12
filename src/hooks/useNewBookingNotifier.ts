// src/hooks/useNewBookingNotifier.ts
import { useEffect } from 'react';
import {
  collection, query, where, onSnapshot, serverTimestamp,
  doc, getDoc, setDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';

const useNewBookingNotifier = () => {
  useEffect(() => {
    const q = query(collection(db, 'bookings'), where('status', '==', 'pending'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type !== 'added') return;

        const bookingId = change.doc.id;
        const booking = change.doc.data() as any;

        
        const [userSnap, serviceSnap, agentSnap] = await Promise.all([
          booking.userId ? getDoc(doc(db, 'users', booking.userId)) : Promise.resolve(null),
          booking.serviceId ? getDoc(doc(db, 'services', booking.serviceId)) : Promise.resolve(null),
          booking.agentId ? getDoc(doc(db, 'agents', booking.agentId)) : Promise.resolve(null),
        ]);

        const userName =
          userSnap && userSnap.exists()
            ? (userSnap.data().username || userSnap.data().fullName || '')
            : '';
        const serviceName =
          serviceSnap && serviceSnap.exists() ? (serviceSnap.data() as any).name || '' : '';
        const agentName =
          agentSnap && agentSnap.exists() ? (agentSnap.data() as any).name || '' : '';

        
        
        
        
        
        const notifPayload = {
          role: 'admin',
          type: 'booking_created',
          title: '🔔 New booking!',
          message:
            userName || serviceName
              ? `New booking from ${userName || booking.phone} for ${serviceName || booking.serviceId} and Phone Number: ${booking.phone || ''} .`
              : `New booking from ${booking.phone} for service ${booking.serviceId}.`,
          icon: 'event_available',
          read: false,

          
          bookingId,
          bookingSnapshot: booking,        
          referenceID: booking.referenceID,
          userId: booking.userId,
          phone: booking.phone,
          address: booking.address || '',
          date: booking.date,
          time: booking.time,
          notes: booking.notes || '',
          status: booking.status,
          serviceId: booking.serviceId,
          agentId: booking.agentId || '',

          
          userName,
          serviceName,
          agentName,

          
          createdAt: serverTimestamp(),    
          bookingCreatedAt: booking.createdAt || null,
        };

        
        await setDoc(doc(db, 'notifications', bookingId), notifPayload);

        
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('🔔 New booking!', {
            body:
              userName || serviceName
                ? `From ${userName || booking.phone} • ${serviceName || booking.serviceId}`
                : `From ${booking.phone}`,
          });
        }
      });
    });

    return () => unsubscribe();
  }, []);
};

export default useNewBookingNotifier;
