import { Component, OnInit } from '@angular/core';
import { addTodo, loadTodos, removeTodo } from '../state/todos/todo.actions';
import { Store } from '@ngrx/store';
import { Todo } from './todo.model';
import { selectAllTodos } from '../state/todos/todo.seletors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss'],
})
export class TodoPageComponent implements OnInit {
  allTodos$: Observable<any[]> | undefined;
  public todo = '';

  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.allTodos$ = this.store.select(selectAllTodos as any);
    this.store.dispatch(loadTodos());
  }

  addTodo() {
    this.store.dispatch(addTodo({ content: this.todo }));
    this.todo = '';
  }

  removeTodo(todo: Todo) {
    this.store.dispatch(removeTodo({ id: todo.id }));
  }
}
