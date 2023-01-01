// Blog
import { Home } from "./blog/home";
import { SinglePage } from "./blog/single";
import { Search } from "./blog/search";
import { Category } from "./blog/category";

// Login
import { Login } from "./auth/login";

// Dashboard
import { Dashboard } from "./admin/dashboard";
// Category
import { ListCategory } from "./admin/category/listCategory";
import { CreateCategory } from "./admin/category/createCategory";
import { EditCategory } from "./admin/category/editCategory";
// Comment
import { ListComment } from "./admin/comment/listComment";
// Post
import { ListPost } from "./admin/post/listPost";
import { CreatePost } from "./admin/post/createPost";
import { EditPost } from "./admin/post/editPost";
import { GeneratePost } from "./admin/post/generatePost";

export { 
    Home, SinglePage, Search, Category,
    Login, 
    Dashboard, 
    ListCategory, CreateCategory, EditCategory,
    ListComment,
    ListPost, CreatePost, EditPost, GeneratePost
};
