const supertest = require('supertest');
const http = require('http');
let server;
let request;

beforeAll((done) => {
    const app = require('/home/ubuntu/ZooDatabase/server/src/main.js'); 
    server = http.createServer(app).listen(0); // Listen on a random available port
    request = supertest(server);
    done();
});

afterAll((done) => {
    server.close(done);
});

describe('API Routes Tests', () => {
    // POSTS
    it('POST /api/zones - should add a new zone', async () => {
        const newZone = {
            Zone_ID: 1, Name: "TestZone", Status: 'Open', Size: 2.0
        }
        const response = await request.post('/api/zones').send(newZone);
        expect(response.statusCode).toBe(201);
    });
    it('POST /api/animals - should add a new animal', async () => {
        const newAnimal = {
            Animal_ID: '1',
            Habitat_ID: '1',
            Name: 'Lion',
            Weight: '200',
            Height: '120',
            Birth_Date: '2010-01-01',
            Species: 'Panthera leo'
        };;
        const response = await request.post('/api/animals').send(newAnimal);
        expect(response.statusCode).toBe(201);
    });
    it('POST /api/customers - should add a new customer', async () => {
        const newCustomer = {
            Customer_ID: 1, Name: "Andrew", Address: "Bethany 12a", Phone: "83282828282", Email: "andrew@gmail.com"
        };
        const response = await request.post('/api/customers').send(newCustomer);
        expect(response.statusCode).toBe(201);
    });
    it('POST /api/animal_health - should add a new animal health record', async () => {
        const newRecord = {
            Animal_ID: 1, 
            Health_ID: 1, 
            Primary_Doctor: "Andrew", 
            Description: "Health Record Test", 
            Date_Of_Examination: "2019-20-03"
        };
        const response = await request.post('/api/animal_health').send(newRecord);
        expect(response.statusCode).toBe(201);
    });
    it('POST /api/habitats - should add a new habitat', async () => {
        const newHabitat = {
            Habitat_ID: 1, 
            Zone_ID: 1, 
            Status: 0, 
            Date_Opened: "2019-20-03", 
        };
        const response = await request.post('/api/habitat').send(newHabitat);
        expect(response.statusCode).toBe(201);
    });
    it('POST /api/employees - should add a new emplopyee', async () => {
        const newEmployee = {
            Employee_ID: 1, 
            Supervisor_ID: 2, 
            Job_ID: 3, 
            Shop_ID: 4, 
            Habitat_ID: 5,
            Restaurant_ID: NULL,
            Fname: 'Arshia',
            Lname: 'Almasi',
            SSN: '123456789',
            Gender: 'Male', 
            Email: 'arhisalmasi@gmail.com', 
            Address: '12943 Bellybrook',
            Birth_Date: '2023-14-03',
            Start_Date: '2023-14-03',
        };
        const response = await request.post('/api/employee').send(newEmployee);
        expect(response.statusCode).toBe(201);
    });
    it('POST /api/has_offsprings - should add a new offspring relationship', async () => {
        const newHas_Offspring = {
            Parent_ID: 2,  
            Child_ID: 3,
            Date_Created: '2023-14-03'
        };
        const response = await request.post('/api/Has_Offspring').send(newHas_Offspring);
        expect(response.statusCode).toBe(201);
    });
    it('POST /api/items - should add a new item', async () => {
        const newItem = {
            Item_ID: 2321,   
            Name: "Sweet Tarts",  
            Stock: 23,    
            Price: 3.90,     
        };
        const response = await request.post('/api/items').send(newItem);
        expect(response.statusCode).toBe(201);
    });
    it('POST /api/jobs - should add a new job', async () => {
        const newJob = {
            Job_ID: 3498,
            Name: 'Zoo Keeper Lions',
            Base_Pay: 45000.0, 
            Description: 'Works in the Lion Habitat.',
        };
        const response = await request.post('/api/jobs').send(newJob);
        expect(response.statusCode).toBe(201);
    });
    it('POST /api/lost_items - should add a new lost item', async () => {
        const newLost_Item = {
            Lost_Item_ID: 389,
            Customer_ID: 3213,
            Description: 'A lost phone',
            Status: 0,
        };
        const response = await request.post('/api/lost_items').send(newLost_Item);
        expect(response.statusCode).toBe(201);
    });
    it('POST /api/menus - should add a new menu', async () => {
        const newMenu = {
            Menu_ID: 9320,
            Name: 'Classys Menu',
            Price: 'I dont know what to put',
            Restaurant_ID: 2348,
        };
        const response = await request.post('/api/menus').send(newMenu);
        expect(response.statusCode).toBe(201);
    });
    it('POST /api/purchases - should add a new purchase', async () => {
        const newPurchase = {
            Item_ID: 238949,
            Shop_ID: 3948,
            Customer_ID: 23894023,
            Quantity: 2,
            Date: "2019-20-03"
        };
        const response = await request.post('/api/purchases').send(newPurchase);
        expect(response.statusCode).toBe(201);
    });
    it('POST /api/restraunts - should add a new restraunt', async () => {
        const newRestraunt = {
            Restaurant_ID: 38948,
            Zone_ID: 2,
            Name: 'Asrhias Restraunt',
            Status: 0,
        };
        const response = await request.post('/api/restraunts').send(newRestraunt);
        expect(response.statusCode).toBe(201);
    });
    it('POST /api/schedules - should add a new schedule', async () => {
        const newSchedule = {
            Schedule_ID: 19023,
            Type_ID: 23,
            Zone_ID: 2,
            Employee_ID: 9213,
            Restaurant_ID: 91302,
            Habitat_ID: 9,
            Shop_ID: 9213,
            Start_Time: '2:00',
            End_Time: '5:00',
            Date: '2019-03-23',
        };
        const response = await request.post('/api/restraunt_orders').send(newSchedule);
        expect(response.statusCode).toBe(201);
    });
    it('POST /api/schedule_types - should add a new schedule_type', async () => {
        const newSchedule_type = {
            Type_ID: 23,
            Name: 'Zoo Keeping',
        };
        const response = await request.post('/api/schedule_types').send(newSchedule_type);
        expect(response.statusCode).toBe(201);
    });
    it('POST /api/shops - should add a new shop', async () => {
        const newShop = {
            Shop_ID: 23,
            Status: 0,
            Name: 'Classy Shop',
        };
        const response = await request.post('/api/shops').send(newShop);
        expect(response.statusCode).toBe(201);
    });
    it('POST /api/tickets - should add a new ticket', async () => {
        const newTicket = {
            Ticket_ID: 23,
            Date_Issued: '2019-03-23',
            Price: 20.00,
            Customer_ID: 380932,
        };
        const response = await request.post('/api/tickets').send(newTicket);
        expect(response.statusCode).toBe(201);
    });
    it('POST /api/complaints - should add a new complaint', async () => {
        const newComplaint = {
            Complaint_ID: 23,
            Customer_ID: 1231,
            Description: 'No animals in this zoo, horrid',
            Date_Created: '2019-04-04',
        };
        const response = await request.post('/api/complaints').send(newComplaint);
        expect(response.statusCode).toBe(201);
    });
    it('POST /api/attends_to - should add a new attends_to realationship', async () => {
        const newAttends_to = {
            Employee_ID: 23,
            Animal_ID: 1231,
            Responsibility: 'Zoo keeping',
        };
        const response = await request.post('/api/attends_to').send(newAttends_to);
        expect(response.statusCode).toBe(201);
    });

    // GETS
    it('GET /api/animals - should return all animals', async () => {
        const response = await request.get('/api/animals');
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
    });
    it('GET /api/customers - should return all customers', async () => {
        const response = await request.get('/api/customers');
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
    });
    it('GET /api/animal_health - should return all animal health records', async () => {
        const response = await request.get('/api/animal_health');
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
    });
    it('GET /api/habitats - should return all habitats', async () => {
        const response = await request.get('/api/habitats');
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
    });
    it('GET /api/employees - should return all employees', async () => {
        const response = await request.get('/api/employees');
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
    });
    it('GET /api/has_offsprings - should return all has_offsprings relationships', async () => {
        const response = await request.get('/api/has_offsprings');
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
    });
    it('GET /api/items - should return all items', async () => {
        const response = await request.get('/api/items');
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
    });
    it('GET /api/jobs - should return all jobs', async () => {
        const response = await request.get('/api/jobs');
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
    });
    it('GET /api/lost_items - should return all lost items', async () => {
        const response = await request.get('/api/lost_items');
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
    });
    it('GET /api/menus - should return all menus', async () => {
        const response = await request.get('/api/menus');
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
    });
    it('GET /api/purchases - should return all purchases', async () => {
        const response = await request.get('/api/purchases');
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
    });
    it('GET /api/restraunts - should return all restraunts', async () => {
        const response = await request.get('/api/restraunts');
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
    });
    it('GET /api/schedules - should return all schedules', async () => {
        const response = await request.get('/api/schedules');
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
    });
    it('GET /api/schedule_types - should return all schedule types', async () => {
        const response = await request.get('/api/schedule_types');
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
    });
    it('GET /api/shops - should return all shops', async () => {
        const response = await request.get('/api/shops');
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
    });
    it('GET /api/tickets - should return all tickets', async () => {
        const response = await request.get('/api/tickets');
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
    });
    it('GET /api/complaints - should return all complaints', async () => {
        const response = await request.get('/api/complaints');
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
    });
    it('GET /api/attends_to - should return all attends_to', async () => {
        const response = await request.get('/api/attends_to');
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
    });
    


    // Deletions
    it('DELETE /api/animal_health - should delete an animal health record', async () => {
        const response = await request.delete('/api/animal_health?Animal_ID=1');
        expect(response.statusCode).toBe(200);
    });
    it('DELETE /api/animals - should delete an animal', async () => {
        const response = await request.delete('/api/animals?Animal_ID=1');
        expect(response.statusCode).toBe(200);
    });
    it('DELETE /api/customers - should delete a customer', async () => {
        const response = await request.delete('/api/customers?Customer_ID=1');
        expect(response.statusCode).toBe(200);
    });
    it('DELETE /api/habitats - should delete a habitat', async () => {
        const response = await request.delete('/api/habitats?Habitat_ID=1');
        expect(response.statusCode).toBe(200);
    });
    it('DELETE /api/employees - should delete a employee', async () => {
        const response = await request.delete('/api/employees?Employee_ID=1');
        expect(response.statusCode).toBe(200);
    });
    // There is a problem with this V
    it('DELETE /api/has_offsprings - should delete a has_offsprings relationship', async () => {
        const response = await request.delete('/api/has_offsprings?Parent_ID=1,Child_ID=1');
        expect(response.statusCode).toBe(200);
    });
    it('DELETE /api/items - should delete a item', async () => {
        const response = await request.delete('/api/items?Item_ID=1');
        expect(response.statusCode).toBe(200);
    });
    it('DELETE /api/menus - should delete a menu', async () => {
        const response = await request.delete('/api/menus?Menu_ID=1');
        expect(response.statusCode).toBe(200);
    });
    // There is a problem with this V
    it('DELETE /api/purchases - should delete a purchase', async () => {
        const response = await request.delete('/api/purchases?Item_ID=1,Shop_ID=1,Customer_ID=1');
        expect(response.statusCode).toBe(200);
    });
    it('DELETE /api/restraunts - should delete a restraunt', async () => {
        const response = await request.delete('/api/restraunts?Restaurant_ID=1');
        expect(response.statusCode).toBe(200);
    });
    it('DELETE /api/schedules - should delete a schedule', async () => {
        const response = await request.delete('/api/schedules?Schedule_ID=1');
        expect(response.statusCode).toBe(200);
    });
    it('DELETE /api/schedule_types - should delete a schedule type', async () => {
        const response = await request.delete('/api/schedule_types?Type_ID=1');
        expect(response.statusCode).toBe(200);
    });
    it('DELETE /api/shops - should delete a shop', async () => {
        const response = await request.delete('/api/shops?Shop_ID=1');
        expect(response.statusCode).toBe(200);
    });
    it('DELETE /api/tickets - should delete a ticket', async () => {
        const response = await request.delete('/api/tickets?Ticket_ID=1');
        expect(response.statusCode).toBe(200);
    });
    it('DELETE /api/complaints - should delete a complaint', async () => {
        const response = await request.delete('/api/complaints?Complaint_ID=1');
        expect(response.statusCode).toBe(200);
    });
    it('DELETE /api/complaints - should delete a complaint', async () => {
        const response = await request.delete('/api/complaints?Complaint_ID=1');
        expect(response.statusCode).toBe(200);
    });
    // There is a problem with this V
    it('DELETE /api/attends_to - should delete a attends_to relationship', async () => {
        const response = await request.delete('/api/attends_to?Employee_ID=1,Animal_ID=1');
        expect(response.statusCode).toBe(200);
    });
    


    // Add more tests for each route as demonstrated above
});

