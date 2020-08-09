import { writable } from 'svelte/store';

const meetups = writable([
        {
            id: 'm1',
            title: 'test title',
            subtitle: 'test substitle',
            description: 'test description',
            imageUrl: 'http://www.underconsideration.com/brandnew/archives/meetup_logo.png',
            address: '27th Nerd Road, 43243 New York',
            contactEmail: 'code@test.com',
            isFavorite: false
        },
                {
            id: 'm2',
            title: 'test title 2',
            subtitle: 'test substitle 2',
            description: 'test description 2',
            imageUrl: 'http://www.underconsideration.com/brandnew/archives/meetup_logo.png',
            address: '27th Nerd Road, 43243 New York',
            contactEmail: 'code2@test.com',
            isFavorite: false
        }
    ]
);

const customMeetupsStore = {
    subscribe: meetups.subscribe,
    addMeetup: meetupData => {
      const newMeetup = {
        ...meetupData
      };
      meetups.update(items => {
        return [newMeetup, ...items];
      });
    },
    updateMeetup: (id, meetupData) => {
      meetups.update(items => {
        const meetupIndex = items.findIndex(i => i.id === id);
        const updatedMeetup = { ...items[meetupIndex], ...meetupData };
        const updatedMeetups = [...items];
        updatedMeetups[meetupIndex] = updatedMeetup;
        return updatedMeetups;
      });
    },
    removeMeetup: id => {
        meetups.update(items => {
            return items.filter(i => i.id !== id);
        });
    },
    toggleFavorite: id => {
      meetups.update(items => {
        const updatedMeetup = { ...items.find(m => m.id === id) };
        updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
        const meetupIndex = items.findIndex(m => m.id === id);
        const updatedMeetups = [...items];
        updatedMeetups[meetupIndex] = updatedMeetup;
        return updatedMeetups;
      });
    }
  };
  
  export default customMeetupsStore;
  