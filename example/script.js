import Gun from 'gun/gun';

localStorage.clear();

const gun = new Gun();



const todo1 = gun.get('todos').set({ name: "Clean house" });
const todo2 = gun.get('todos').set({ name: "Vacuum clean" });

const person1 = gun.get('persons').put({ name: 'Kristian Kaa'});
const person2 = gun.get('persons').put({ name: 'Lisbeth Knudsen'});

todo1.path('assignees').set(person1);
todo1.path('assignees').set(person2);

gun.get('todos').map((todo, id) => {
  console.log('TODO', id, todo);
});

todo1.path('assignees').map(asignee => {
  console.log('ASSIGNEE', asignee);
});
