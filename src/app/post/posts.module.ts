import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PostsListComponent} from './posts-list/posts-list.component';
import {AddPostComponent} from './add-post/add-post.component';
import {PostsResolver} from './post.resolver';
import {EditPostComponent} from './edit-post/edit-post.component';
import {SinglePostComponent} from './single-post/single-post.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EntityDataService, EntityDefinitionService, EntityMetadataMap} from '@ngrx/data';
import {PostsDataService} from './post-data.service';

const routes: Routes = [
  { path: '',
    component: PostsListComponent,
    resolve: {posts: PostsResolver}
  },
  { path: 'add', component: AddPostComponent },
  { path: 'edit/:id',
    component: EditPostComponent,
    resolve: {posts: PostsResolver}
  },
  { path: 'details/:id',
    component: SinglePostComponent,
    resolve: {posts: PostsResolver}
  },
];
const entityMetadata: EntityMetadataMap = {
  Post: {
    // sortComparer: sortByName,
    entityDispatcherOptions: {
      optimisticUpdate: true,
      optimisticDelete: false,
    },
  },
};

@NgModule({
  declarations: [
    PostsListComponent,
    SinglePostComponent,
    EditPostComponent,
    AddPostComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  providers: [PostsResolver, PostsDataService]
})
export class PostsModule {
  constructor(
    eds: EntityDefinitionService,
    entityDataService: EntityDataService,
    postsDataService: PostsDataService
  ) {
    eds.registerMetadataMap(entityMetadata);

    entityDataService.registerService('Post', postsDataService);
  }
}
