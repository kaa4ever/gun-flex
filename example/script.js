import Gun from 'gun/gun';

const gun = new Gun();

// Watch the todos.
gun.get('todos').map().val(todo => {
  console.log('TODO', todo);
});

const todo1 = { name: "Clean house" };

gun.get('todos').set(todo1);

todo1.assignees = ['Kristian Kaa'];

gun.get('todos').set(todo1);