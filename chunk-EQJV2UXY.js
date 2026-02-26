import{a as m}from"./chunk-W7RS75CD.js";import{Z as l,oa as d}from"./chunk-SPW2YRD4.js";import{g as s}from"./chunk-RA2WU32H.js";var f=class i extends m{getTableName(){return"promotion_notifications"}daysUntilNextAllowed(){return s(this,null,function*(){let r=yield this.getCurrentRestaurantId();if(!r)return 0;let{data:e}=yield this.getSupabaseClientPublic().from(this.getTableName()).select("sent_at").eq("restaurant_id",r).order("sent_at",{ascending:!1}).limit(1);if(!e||e.length===0)return 0;let n=new Date(e[0].sent_at),t=Math.ceil((Date.now()-n.getTime())/(1e3*60*60*24));return t>=7?0:7-t})}hasBeenNotified(r){return s(this,null,function*(){let e=yield this.getCurrentRestaurantId();if(!e)return!1;let{data:n}=yield this.getSupabaseClientPublic().from(this.getTableName()).select("id").eq("promotion_id",r).eq("restaurant_id",e).limit(1);return(n?.length??0)>0})}sendPromotionPush(r){return s(this,null,function*(){let e=yield this.getCurrentRestaurantId();if(!e)return{success:!1,errorCode:"unknown",message:"Ristorante non trovato"};let{data:n,error:t}=yield this.getSupabaseClientPublic().from("restaurant_followers").select("user_id").eq("restaurant_id",e);if(t||!n?.length)return{success:!1,errorCode:"no_recipients",message:"Nessun follower"};let p=n.map(o=>o.user_id),{data:a,error:_}=yield this.getSupabaseClientPublic().from("push_subscriptions").select("user_id").eq("is_active",!0).in("user_id",p);if(_||!a?.length)return{success:!1,errorCode:"no_recipients",message:"Nessun follower con notifiche attive"};let u=[...new Set(a.map(o=>o.user_id))],g=u.map(o=>({promotion_id:r,restaurant_id:e,user_id:o,channel:"push",status:"sent",sent_at:new Date().toISOString()})),{error:c}=yield this.getSupabaseClientPublic().from("promotion_notifications").insert(g);return c?(console.error("Errore inserimento notifiche:",c),{success:!1,errorCode:"unknown",message:"Errore durante il salvataggio"}):{success:!0,sent:u.length}})}getMyPromotions(){return s(this,null,function*(){let r=this.authService.currentUserValue?.id;if(!r)return[];let{data:e,error:n}=yield this.getSupabaseClientPublic().from("promotion_notifications").select(`
      id,
      sent_at,
      promotion:promotions!inner (
        id,
        name,
        description,
        image_url,
        type,
        discount_value,
        max_discount_amount,
        valid_from,
        valid_until,
        min_order_amount
      ),
      restaurant:restaurants!inner (
        id,
        name,
        logo_url
      )
    `).eq("user_id",r).order("sent_at",{ascending:!1});return n?(console.error("Errore nel recupero promozioni utente:",n),[]):(e||[]).map(t=>({notification_id:t.id,sent_at:t.sent_at,promotion:Array.isArray(t.promotion)?t.promotion[0]:t.promotion,restaurant:Array.isArray(t.restaurant)?t.restaurant[0]:t.restaurant}))})}static \u0275fac=(()=>{let r;return function(n){return(r||(r=d(i)))(n||i)}})();static \u0275prov=l({token:i,factory:i.\u0275fac,providedIn:"root"})};export{f as a};
