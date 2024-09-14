/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('sheets').del()

  // Inserts seed entries
  await knex('sheets').insert([
    { title: 'Chopin_-_Nocturne_Op_9_No_2_E_Flat_Major', 
      description: 'Classical music piece', 
      file_path: 'https://drive.google.com/uc?export=view&id=19zN9X7UGKXoRfbbAY0q_EJFJCNnG7XUf', 
      upload_date: new Date() 
    },
    { title: 'Canon_in_D_', 
      description: 'Classical music piece', 
      file_path: 'https://drive.google.com/file/d/1JDKWclzDvaPiCMO2i8CFvJuDdnr74Jg9/view?usp=drive_link', 
      upload_date: new Date() 
    },
  ]);
};