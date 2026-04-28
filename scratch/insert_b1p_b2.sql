-- SQL Script to insert B1+ and B2 units and questions
-- Run this in your Supabase SQL Editor

-- B1+ Level Units and Questions
DO $$ 
DECLARE 
    unit_id_b1p_1 INT;
    unit_id_b1p_2 INT;
    unit_id_b1p_3 INT;
    unit_id_b1p_4 INT;
    unit_id_b1p_5 INT;
    unit_id_b1p_6 INT;
    unit_id_b1p_7 INT;
    unit_id_b2_1 INT;
    unit_id_b2_2 INT;
    unit_id_b2_3 INT;
    unit_id_b2_4 INT;
    unit_id_b2_5 INT;
BEGIN 

    -- B1+ Units
    INSERT INTO units (title, description, level) VALUES ('Unit 1: Human Brain', 'Discussion about brain power, memory, and concentration.', 'b1+') RETURNING id INTO unit_id_b1p_1;
    INSERT INTO units (title, description, level) VALUES ('Unit 2: Time', 'Discussion about time management and favorite times of the day.', 'b1+') RETURNING id INTO unit_id_b1p_2;
    INSERT INTO units (title, description, level) VALUES ('Unit 3: Getting Sick', 'Discussion about health, sickness, and stress.', 'b1+') RETURNING id INTO unit_id_b1p_3;
    INSERT INTO units (title, description, level) VALUES ('Unit 4: Changes in Life', 'Discussion about how life has changed and modern technology.', 'b1+') RETURNING id INTO unit_id_b1p_4;
    INSERT INTO units (title, description, level) VALUES ('Unit 5: Modern Cities', 'Discussion about big cities, their problems, and preferences.', 'b1+') RETURNING id INTO unit_id_b1p_5;
    INSERT INTO units (title, description, level) VALUES ('Unit 6: Food Tradition', 'Discussion about popular and traditional foods and preservation.', 'b1+') RETURNING id INTO unit_id_b1p_6;
    INSERT INTO units (title, description, level) VALUES ('Unit 7: Technology', 'Discussion about daily use of technology and gadgets.', 'b1+') RETURNING id INTO unit_id_b1p_7;

    -- B2 Units
    INSERT INTO units (title, description, level) VALUES ('Unit 1: Riding through history', 'Discussion about bicycles, their benefits, and history.', 'b2') RETURNING id INTO unit_id_b2_1;
    INSERT INTO units (title, description, level) VALUES ('Unit 2: Fighting diseases', 'Discussion about medicine, natural remedies, and the immune system.', 'b2') RETURNING id INTO unit_id_b2_2;
    INSERT INTO units (title, description, level) VALUES ('Unit 3: Education and Learning', 'Discussion about study habits, teachers, and the role of technology in education.', 'b2') RETURNING id INTO unit_id_b2_3;
    INSERT INTO units (title, description, level) VALUES ('Unit 4: Work and Jobs', 'Discussion about career choices, job satisfaction, and workplace challenges.', 'b2') RETURNING id INTO unit_id_b2_4;
    INSERT INTO units (title, description, level) VALUES ('Unit 5: Environment', 'Discussion about environmental issues, pollution, and recycling.', 'b2') RETURNING id INTO unit_id_b2_5;

    -- B1+ Questions
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_1, 'Do you think your brain is powerful? Why?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_1, 'What do you do to remember things better?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_1, 'What do you do when you want to concentrate?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_1, 'Do you like playing individual games or with a team?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_1, 'Do you think you can improve your memory?');

    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_2, 'Do you think you use your time well?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_2, 'What is your favorite time of the day? Morning, afternoon, or evening?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_2, 'What would you do if you had a lot of free time now?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_2, 'What do you do in your free time?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_2, 'Do you sometimes feel you don’t have enough time?');

    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_3, 'What do you do when you feel sick?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_3, 'What do you do to stay healthy?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_3, 'Can stress make you feel sick?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_3, 'When were you last sick? And, what did you do?');

    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_4, 'Do you think life is easier now?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_4, 'What is different now compared to the past?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_4, 'Do you like modern technology?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_4, 'What things were better before?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_4, 'What will life be like in the future?');

    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_5, 'Do you like big cities?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_5, 'What problems are there in big cities?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_5, 'Do you want to live in a city or a village? Why?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_5, 'Is your city too crowded?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_5, 'What do you NOT like about your city?');

    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_6, 'What food is popular in your country?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_6, 'Do you like traditional food?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_6, 'How do people keep food for a long time?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_6, 'Do you like fresh food or frozen food?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_6, 'What food do you eat every day?');

    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_7, 'Do you use technology every day?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_7, 'What is your favorite gadget? Why?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_7, 'Does technology help people? How?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_7, 'Do you like texting messages or calling to talk to someone?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b1p_7, 'What new technology do you want to buy?');

    -- B2 Questions
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_1, 'Do you like riding a bicycle? Why or why not?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_1, 'Why do people ride bicycles?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_1, 'What are the benefits of riding a bicycle?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_1, 'Do you think bicycles are better than cars? Why or why not?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_1, 'Do you think children should learn to ride bikes? Why?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_1, 'Would you like to travel by bicycle for a long distance? Why?');

    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_2, 'What medicines do you usually take when you are sick?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_2, 'Do you prefer natural remedies or modern medicine? Why?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_2, 'How can people prevent common illnesses?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_2, 'Do you think doctors are always necessary? Why or why not?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_2, 'What should people do to have a strong immune system?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_2, 'Have you ever been seriously ill? What happened?');

    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_3, 'Do you prefer studying alone or in a group? Why?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_3, 'What makes a good teacher?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_3, 'How has technology changed education?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_3, 'What is more important: knowledge or skills? Why?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_3, 'Do you think school prepares students for real life?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_3, 'What would you like to learn in the future?');

    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_4, 'What kind of job would you like to have in the future?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_4, 'What is more important: salary or job satisfaction? Why?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_4, 'Do you prefer working alone or in a team?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_4, 'What are the biggest challenges at work?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_4, 'How can people improve their career?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_4, 'Do you think people should change jobs often? Why or why not?');

    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_5, 'What environmental problems are common in your country?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_5, 'How can people help protect the environment?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_5, 'Do you think climate change is a serious problem? Why?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_5, 'What can governments do to improve the environment?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_5, 'Do you recycle? Why or why not?');
    INSERT INTO questions (unit_id, text) VALUES (unit_id_b2_5, 'How can we reduce pollution in cities?');

END $$;
