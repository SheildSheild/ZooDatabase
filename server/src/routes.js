const m=['Manager'], em=['Medic',...m],e=['Employee',...em], c=['Customer'], cm=[...c,...m], a='All', n=[];
function access(v,m,c){
  return {
    view:v,
    modify:m,
    create:c||m,
    rolesWithAccess(method){
      if(method==='GET')
        return v;
      else return m;
    }
  };
}

module.exports={
  routes:{
    "zones":access(e,m),
    "habitats":access(e,m),
    "animals":access(a,e),
    "shops":access(a,m),
    "restaurants":access(a,m),
    "employees":access(m,m),
    "animal_health":access(em,em),
    "items":access(e,m),
    "customers":access(cm,a),
    "lost_items":access(e,e),
    "complaints":access(m,c),
    "schedule_types":access(m,m),
    "employee_schedules":access(e,m),
    "animal_schedules":access(e,m),
    "shop_schedules":access(e,m),
    "habitat_schedules":access(e,m),
    "timesheets":access(e,m),
    "attends_to":access(e,m),
    "purchases":access(cm,m),
    "tickets":access(cm,m),
    "login_customers":access(a,c),
    "login_employees":access(a,m),
    "shop_revenue":access(m,n),
    "ticket_monthly_revenue":access(m,n),
    "pay_stub":access(e,n),
    "monthly_visit":access(m,n),
    "animals_view":access(m,n),
    "animal_health_view":access(m,n),
    "alerts":access(m,n)
  }
}
