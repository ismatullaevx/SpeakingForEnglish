import { supabase } from './supabase.js';

const seedData = async () => {
    console.log('Starting seeding process...');

    const units = [
        {
            id: 1,
            title: 'Daily Life & Routine',
            description: 'Practice describing your everyday activities, hobbies, and personal background. Essential for B1 Part 1.'
        },
        {
            id: 2,
            title: 'Travel & Experiences',
            description: 'Discuss your past travels, future plans, and memorable experiences from different places.'
        },
        {
            id: 3,
            title: 'Environment & Nature',
            description: 'Express opinions about environmental issues and describe natural landscapes.'
        }
    ];

    const questions = [
        // Unit 1
        { unit_id: 1, text: 'Can you describe a typical weekday in your life?' },
        { unit_id: 1, text: 'What is your favorite hobby and why do you enjoy it?' },
        { unit_id: 1, text: 'Do you prefer spending your weekends alone or with friends?' },
        
        // Unit 2
        { unit_id: 2, text: 'Tell me about a memorable trip you took in the last two years.' },
        { unit_id: 2, text: 'What are the advantages and disadvantages of traveling by plane?' },
        { unit_id: 2, text: 'If you could visit any country in the world, where would you go?' },

        // Unit 3
        { unit_id: 3, text: 'What are some small things people can do to protect the environment?' },
        { unit_id: 3, text: 'Describe a beautiful natural place you have visited.' },
        { unit_id: 3, text: 'How has the weather changed in your country over the last few years?' }
    ];

    try {
        console.log('Inserting units...');
        const { error: unitError } = await supabase.from('units').upsert(units);
        if (unitError) throw unitError;

        console.log('Inserting questions...');
        const { error: questionError } = await supabase.from('questions').upsert(questions);
        if (questionError) throw questionError;

        console.log('Seeding completed successfully!');
    } catch (err) {
        console.error('Error seeding database:', err.message);
    }
};

seedData();
