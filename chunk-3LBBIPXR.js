import{b as p}from"./chunk-PJAEBTL6.js";import{Y as d,ba as g,g as l}from"./chunk-HZF257L5.js";import{j as i}from"./chunk-4ZZIO3ZI.js";var b=class u{supabaseService=g(p);restaurantSubject=new l(null);restaurant$=this.restaurantSubject.asObservable();loadRestaurantById(r){return i(this,null,function*(){try{let{data:e,error:t}=yield this.supabaseService.getSupabaseClient().from("restaurants").select("*").eq("id",r).eq("is_active",!0).single();if(t)throw t;return e}catch(e){return console.error("\u274C Error loading restaurant by ID:",e),null}})}loadRestaurantShifts(r){return i(this,null,function*(){try{let{data:e,error:t}=yield this.supabaseService.getSupabaseClient().from("shifts").select("*").eq("restaurant_id",r).eq("is_active",!0).order("start_time");if(t)throw t;return e||[]}catch(e){return console.error("\u274C Error loading restaurant shifts:",e),[]}})}loadRestaurantDishes(r){return i(this,null,function*(){try{let{data:e,error:t}=yield this.supabaseService.getSupabaseClient().from("dishes").select("*").eq("restaurant_id",r).eq("status","available").order("name");if(t)throw t;return e||[]}catch(e){return console.error("\u274C Error loading restaurant dishes:",e),[]}})}loadRestaurantDishesWithCategories(r){return i(this,null,function*(){try{let{data:e,error:t}=yield this.supabaseService.getSupabaseClient().from("dishes").select(`
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
        `).eq("restaurant_id",r).eq("status","available").order("name");if(t)throw t;return(e||[]).map(a=>{let s=a.categories&&a.categories.length>0?a.categories[0]:null;return{id:a.id,name:a.name,description:a.description,base_price:a.base_price,delivery_price:a.delivery_price,takeaway_price:a.takeaway_price,image_url:a.image_url,preparation_time:a.preparation_time,status:a.status,category_id:a.category_id,category_name:s?s.name:void 0}})}catch(e){return console.error("\u274C Error loading restaurant dishes with categories:",e),this.loadRestaurantDishes(r)}})}loadRestaurantCategories(r){return i(this,null,function*(){try{let{data:e,error:t}=yield this.supabaseService.getSupabaseClient().from("categories").select("*").eq("restaurant_id",r).order("order_index");if(t)throw t;return e||[]}catch(e){return console.error("\u274C Error loading restaurant categories:",e),[]}})}loadRestaurantsByCuisine(r){return i(this,null,function*(){try{let e=this.supabaseService.getSupabaseClient().from("restaurants").select("*").eq("is_active",!0).order("name");r&&(e=e.eq("cuisine_type",r));let{data:t,error:a}=yield e;if(a)throw a;return t||[]}catch(e){return console.error("\u274C Error loading restaurants:",e),[]}})}loadRestaurant(r){return i(this,null,function*(){try{let{data:e,error:t}=yield this.supabaseService.getSupabaseClient().from("restaurants").select("*").eq("id",r).eq("is_active",!0).single();if(t)throw t;return this.restaurantSubject.next(e),e}catch(e){return console.error("\u274C Error loading restaurant:",e),null}})}loadRestaurantPhotos(r){return i(this,null,function*(){try{let e=this.supabaseService.getSupabaseClient(),{data:t,error:a}=yield e.from("restaurant_photos").select("*").eq("restaurant_id",r).order("display_order",{ascending:!0});if(a)throw a;let s=(t||[]).map(n=>{if(n.file_path){let{data:{publicUrl:c}}=e.storage.from("restaurant-images").getPublicUrl(n.file_path);return c}return null}).filter(n=>n!==null);return console.log("\u{1F5BC}\uFE0F Foto caricate per slideshow:",s),s}catch(e){return console.error("\u274C Errore caricamento foto per ristorante pubblico:",e),[]}})}loadRestaurantMenus(r){return i(this,null,function*(){try{let{data:e,error:t}=yield this.supabaseService.getSupabaseClient().from("menus").select("*").eq("restaurant_id",r).eq("is_active",!0).order("display_order");if(t)throw t;return e||[]}catch(e){return console.error("\u274C Error loading restaurant menus:",e),[]}})}isValidUUID(r){return!r||r==="null"||r==="undefined"?!1:/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(r)}loadMenuDishesWithDetails(r){return i(this,null,function*(){if(this.isCustomerPath())return console.log("\u{1F6D1} Chiamata bloccata: siamo in impostazioni utente"),Promise.resolve([]);if(!r||r==="null"||r==="undefined")return console.warn("\u26A0\uFE0F menuId non valido:",r),Promise.resolve([]);if(!this.isValidUUID(r))return console.warn("\u{1F6D1} loadMenuDishesWithDetails: menuId non valido",r),[];try{let{data:e,error:t}=yield this.supabaseService.getSupabaseClient().from("menu_dishes").select(`
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
      `).eq("menu_id",r).eq("is_active",!0).order("display_order");if(t)throw t;return(e||[]).filter(a=>a.dish&&!a.dish.deleted_at).map(a=>a.dish)}catch(e){return console.error("\u274C Error loading menu dishes:",e),[]}})}loadRestaurantActiveMenuDishes(r){return i(this,null,function*(){try{let{data:e,error:t}=yield this.supabaseService.getSupabaseClient().from("menus").select("id").eq("restaurant_id",r).eq("is_active",!0);if(t)throw t;if(!e||e.length===0)return[];let a=e.map(o=>o.id),{data:s,error:n}=yield this.supabaseService.getSupabaseClient().from("menu_dishes").select(`
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
      `).in("menu_id",a).eq("is_active",!0);if(n)throw n;let c=new Map;return(s||[]).forEach(o=>{o.dish&&!o.dish.deleted_at&&o.dish.status==="available"&&c.set(o.dish.id,o.dish)}),Array.from(c.values())}catch(e){return console.error("\u274C Error loading active menu dishes:",e),[]}})}isCustomerPath(){let r=window.location.pathname;return r.includes("/customer/")||r.includes("/settings")}static \u0275fac=function(e){return new(e||u)};static \u0275prov=d({token:u,factory:u.\u0275fac,providedIn:"root"})};export{b as a};
