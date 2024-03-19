
const supertest = require('supertest');
const http = require('http');
let server;
let db;
let request;

beforeAll((done) => {
    ({server,db}= require('./../src/main.js')); 
    request = supertest(server);
    done();
});

afterAll((done) => {
    db.end();
    server.close(done);
});

const timeOut=1000;

describe('API Routes Tests', () => {
    // POSTS
    it('POST /api/zones - should add a new zone', async () => {
        const newZone = {
            Zone_ID: 1, Name: "TestZone", Status: 'Open', Size: 2.0
        }
        const response = await request.post('/api/zones').send(newZone);
        expect(response.statusCode).toBe(201);
    },timeOut);
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
    },timeOut);
    it('POST /api/customers - should add a new customer', async () => {
        const newCustomer = {
            Customer_ID: 1,
            Name: "Andrew", 
            Address: "Bethany 12a", 
            Phone: "83282828282", 
            Email: "andrew@gmail.com"
        };
        const response = await request.post('/api/customers').send(newCustomer);
        expect(response.statusCode).toBe(201);
    },timeOut);
    it('POST /api/animal_health - should add a new animal health record', async () => {
        const newRecord = {
            Animal_ID: 1, 
            Health_ID: 1, 
            Primary_Doctor: 1, 
            Description: "Health Record Test", 
            Date_Of_Examination: "2019-20-03"
        };
        const response = await request.post('/api/animal_health').send(newRecord);
        expect(response.statusCode).toBe(201);
    },timeOut);
    it('POST /api/habitats - should add a new habitat', async () => {
        const newHabitat = {
            Habitat_ID: 1, 
            Zone_ID: 1, 
            Status: 0, 
            Date_Opened: "2019-20-03", 
        };
        const response = await request.post('/api/habitat').send(newHabitat);
        expect(response.statusCode).toBe(201);
    },timeOut);
    it('POST /api/employees - should add a new emplopyee', async () => {
        const newEmployee = {
            Employee_ID: 1, 
            Supervisor_ID: 2, 
            Job_ID: 3, 
            Shop_ID: 4, 
            Habitat_ID: 5,
            Restaurant_ID: null,
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
    },timeOut);
    it('POST /api/has_offsprings - should add a new offspring relationship', async () => {
        const newHas_Offspring = {
            Parent_ID: 2,  
            Child_ID: 3,
            Date_Created: '2023-14-03'
        };
        const response = await request.post('/api/Has_Offspring').send(newHas_Offspring);
        expect(response.statusCode).toBe(201);
    },timeOut);
    it('POST /api/items - should add a new item', async () => {
        const newItem = {
            Item_ID: 2321,   
            Name: "Sweet Tarts",  
            Stock: 23,    
            Price: 3.90,     
        };
        const response = await request.post('/api/items').send(newItem);
        expect(response.statusCode).toBe(201);
    },timeOut);
    it('POST /api/jobs - should add a new job', async () => {
        const newJob = {
            Job_ID: 3498,
            Name: 'Zoo Keeper Lions',
            Base_Pay: 4500.0, 
            Description: 'Works in the Lion Habitat.',
        };
        const response = await request.post('/api/jobs').send(newJob);
        expect(response.statusCode).toBe(201);
    },timeOut);
    it('POST /api/lost_items - should add a new lost item', async () => {
        const newLost_Item = {
            Lost_Item_ID: 389,
            Customer_ID: null,
            Description: 'A lost phone',
            Status: 'Pending',
        };
        const response = await request.post('/api/lost_items').send(newLost_Item);
        expect(response.statusCode).toBe(201);
    },timeOut);
    it('POST /api/menus - should add a new menu', async () => {
        const newMenu = {
            Menu_ID: 9320,
            Name: 'Classys Menu',
            Price: 'I dont know what to put',
            Restaurant_ID: 2348,
        };
        const response = await request.post('/api/menus').send(newMenu);
        expect(response.statusCode).toBe(201);
    },timeOut);

    
    // GETS
    it('GET /api/animals - should return all animals', async () => {
        const response = await request.get('/api/animals');
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
    },timeOut);
    it('GET /api/customers - should return all customers', async () => {
        const response = await request.get('/api/customers');
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
    },timeOut);
    it('GET /api/animal_health - should return all animal health records', async () => {
        const response = await request.get('/api/animal_health');
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json');
    },timeOut);

    // Deletions
    it('DELETE /api/animal_health - should delete an animal health record', async () => {
        const response = await request.delete('/api/animal_health?Animal_ID=1');
        expect(response.statusCode).toBe(200);
    },timeOut);
    it('DELETE /api/animals - should delete an animal', async () => {
        const response = await request.delete('/api/animals?Animal_ID=1');
        expect(response.statusCode).toBe(200);
    },timeOut);
    it('DELETE /api/customers - should delete a customer', async () => {
        const response = await request.delete('/api/customers?Customer_ID=1');
        expect(response.statusCode).toBe(200);
    },timeOut);
    // Add more tests for each route as demonstrated above
});

