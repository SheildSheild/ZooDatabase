const e='employee',m='manager', em='medic', c='customer', a='all';
function access(v,m){
  return {
    view:v,
    modify:m
  };
}

module.exports={
  routes:{
    "zones":access(e,m),
    "habitats":access(e,m),
    "animals":access(a,e),
    // "jobs":access(a,m),
    "shops":access(a,m),
    "restaurants":access(a,m),
    "employees":access(m,m),
    "animal_health":access(em,em),
    "items":access(e,m),
    "customers":access(c,c),
    "lost_items":access(e,e),
    "complaints":access(m,c),
    "schedule_types":access(m,m),
    "schedules":access(e,m),
    // "has_offsprings":access(e,em),
    "attends_to":access(e,m),
    "purchases":access(m,m),
    "tickets":access(m,m),
    // "menus":access(),
    // "restaurant_orders",
    "users":access(m,m),
    "register":access(c,c),
    "login":access(a,a)
  }
}
