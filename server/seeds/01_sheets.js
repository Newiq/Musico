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
      file_path: 'file:///F:/Web%20dev/Brainstation/capstone/scores_data/Chopin_-_Nocturne_Op_9_No_2_E_Flat_Major.pdf', 
      upload_date: new Date() 
    },
    { title: 'Canon_in_D_', 
      description: 'Classical music piece', 
      file_path: 'file:///F:/Web%20dev/Brainstation/capstone/scores_data/Canon_in_D_-_4_Hands.pdf', 
      upload_date: new Date() 
    },
  ]);
};