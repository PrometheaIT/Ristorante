import{b as p}from"./chunk-QGVET3VN.js";import{Y as d,ba as g,g as l}from"./chunk-25TB2OJR.js";import{j as i}from"./chunk-4ZZIO3ZI.js";var _=class u{supabaseService=g(p);restaurantSubject=new l(null);restaurant$=this.restaurantSubject.asObservable();loadRestaurantById(a){return i(this,null,function*(){try{let{data:e,error:r}=yield this.supabaseService.getSupabaseClient().from("restaurants").select("*").eq("id",a).eq("is_active",!0).single();if(r)throw r;return e}catch(e){return console.error("\u274C Error loading restaurant by ID:",e),null}})}loadRestaurantShifts(a){return i(this,null,function*(){try{let{data:e,error:r}=yield this.supabaseService.getSupabaseClient().from("shifts").select("*").eq("restaurant_id",a).eq("is_active",!0).order("start_time");if(r)throw r;return e||[]}catch(e){return console.error("\u274C Error loading restaurant shifts:",e),[]}})}loadRestaurantDishes(a){return i(this,null,function*(){try{let{data:e,error:r}=yield this.supabaseService.getSupabaseClient().from("dishes").select("*").eq("restaurant_id",a).eq("status","available").order("name");if(r)throw r;return e||[]}catch(e){return console.error("\u274C Error loading restaurant dishes:",e),[]}})}loadRestaurantDishesWithCategories(a){return i(this,null,function*(){try{let{data:e,error:r}=yield this.supabaseService.getSupabaseClient().from("dishes").select(`
          id,
          name,
          description,
          base_price,
          delivery_price,
          takeaway_price,
          image_url,
          preparation_time,
          status,
          category_id,
          categories (
            id,
            name
          )
        `).eq("restaurant_id",a).eq("status","available").order("name");if(r)throw r;return(e||[]).map(t=>{let s=t.categories&&t.categories.length>0?t.categories[0]:null;return{id:t.id,name:t.name,description:t.description,base_price:t.base_price,delivery_price:t.delivery_price,takeaway_price:t.takeaway_price,image_url:t.image_url,preparation_time:t.preparation_time,status:t.status,category_id:t.category_id,category_name:s?s.name:void 0}})}catch(e){return console.error("\u274C Error loading restaurant dishes with categories:",e),this.loadRestaurantDishes(a)}})}loadRestaurantCategories(a){return i(this,null,function*(){try{let{data:e,error:r}=yield this.supabaseService.getSupabaseClient().from("categories").select("*").eq("restaurant_id",a).order("order_index");if(r)throw r;return e||[]}catch(e){return console.error("\u274C Error loading restaurant categories:",e),[]}})}loadRestaurantsByCuisine(a){return i(this,null,function*(){try{let e=this.supabaseService.getSupabaseClient().from("restaurants").select("*").eq("is_active",!0).order("name");a&&(e=e.eq("cuisine_type",a));let{data:r,error:t}=yield e;if(t)throw t;return r||[]}catch(e){return console.error("\u274C Error loading restaurants:",e),[]}})}loadRestaurant(a){return i(this,null,function*(){try{let{data:e,error:r}=yield this.supabaseService.getSupabaseClient().from("restaurants").select("*").eq("id",a).eq("is_active",!0).single();if(r)throw r;return this.restaurantSubject.next(e),e}catch(e){return console.error("\u274C Error loading restaurant:",e),null}})}loadRestaurantPhotos(a){return i(this,null,function*(){try{let e=this.supabaseService.getSupabaseClient(),{data:r,error:t}=yield e.from("restaurant_photos").select("*").eq("restaurant_id",a).order("display_order",{ascending:!0});if(t)throw t;let s=(r||[]).map(n=>{if(n.file_path){let{data:{publicUrl:c}}=e.storage.from("restaurant-images").getPublicUrl(n.file_path);return c}return null}).filter(n=>n!==null);return console.log("\u{1F5BC}\uFE0F Foto caricate per slideshow:",s),s}catch(e){return console.error("\u274C Errore caricamento foto per ristorante pubblico:",e),[]}})}loadRestaurantMenus(a){return i(this,null,function*(){try{let{data:e,error:r}=yield this.supabaseService.getSupabaseClient().from("menus").select("*").eq("restaurant_id",a).eq("is_active",!0).order("display_order");if(r)throw r;return e||[]}catch(e){return console.error("\u274C Error loading restaurant menus:",e),[]}})}loadMenuDishesWithDetails(a){return i(this,null,function*(){try{let{data:e,error:r}=yield this.supabaseService.getSupabaseClient().from("menu_dishes").select(`
        *,
        dish:dishes!dish_id (
          id,
          name,
          description,
          base_price,
          delivery_price,
          takeaway_price,
          image_url,
          preparation_time,
          status,
          category_id
        )
      `).eq("menu_id",a).eq("is_active",!0).order("display_order");if(r)throw r;return(e||[]).filter(t=>t.dish&&!t.dish.deleted_at).map(t=>t.dish)}catch(e){return console.error("\u274C Error loading menu dishes:",e),[]}})}loadRestaurantActiveMenuDishes(a){return i(this,null,function*(){try{let{data:e,error:r}=yield this.supabaseService.getSupabaseClient().from("menus").select("id").eq("restaurant_id",a).eq("is_active",!0);if(r)throw r;if(!e||e.length===0)return[];let t=e.map(o=>o.id),{data:s,error:n}=yield this.supabaseService.getSupabaseClient().from("menu_dishes").select(`
        dish:dishes!dish_id (
          id,
          name,
          description,
          base_price,
          delivery_price,
          takeaway_price,
          image_url,
          preparation_time,
          status,
          category_id
        )
      `).in("menu_id",t).eq("is_active",!0);if(n)throw n;let c=new Map;return(s||[]).forEach(o=>{o.dish&&!o.dish.deleted_at&&o.dish.status==="available"&&c.set(o.dish.id,o.dish)}),Array.from(c.values())}catch(e){return console.error("\u274C Error loading active menu dishes:",e),[]}})}static \u0275fac=function(e){return new(e||u)};static \u0275prov=d({token:u,factory:u.\u0275fac,providedIn:"root"})};export{_ as a};
