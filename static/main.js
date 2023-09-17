let responses = {
    
    "hello": ["Hello! How can I assist you today?", "Hi there! How can I help you?"],
    "what is mining": ["Mining is the process of extracting valuable minerals or other geological materials from the earth.", "Mining is the extraction of minerals from the earth's crust."],
    "types of mining": ["There are various types of mining, including surface mining and underground mining.", "Mining methods include open-pit mining and shaft mining."],
    "tell me about mining": ["Mining is the extraction of minerals or other geological materials from the earth's crust.", "Types of mining include surface mining and underground mining."],
    "mining safety": ["Mining safety is crucial to protect workers and the environment.", "Safety measures in mining include using safety equipment and following regulations."],
    "environmental impact of mining": ["Mining can have environmental impacts, such as soil erosion and habitat disruption.", "Environmental regulations aim to mitigate these effects."],
    "mining companies": ["There are many mining companies worldwide, including Rio Tinto, BHP, and Anglo American.", "Mining companies extract and process minerals for various industries."],
    "mining equipment": ["Mining equipment includes machinery like excavators, drills, and haul trucks.", "These machines are used in different mining operations."],
   	"mining regulations": ["Mining regulations are laws and guidelines that govern the mining industry.", "They are designed to ensure safety and environmental protection."],
	"mining and sustainability": ["Sustainability in mining involves responsible practices to minimize environmental impact and support local communities.", "Sustainable mining aims to balance resource extraction with long-term environmental and social considerations.","Mining and sustainability are linked through responsible mining practices that aim to minimize environmental impact and support local communities.","Mining can impact the environment through land disruption, water pollution, and habitat destruction. Sustainable mining seeks to mitigate these effects.","Sustainable mining practices include reclamation of mined lands, reducing waste, and using energy-efficient technologies.","Mining can contribute to sustainable development by generating economic opportunities, supporting local communities, and adhering to environmental standards.","Yes, responsible resource extraction in mining involves minimizing environmental impacts, respecting human rights, and promoting ethical practices.","Mining companies can practice environmental stewardship by implementing reclamation plans, reducing emissions, and using sustainable water management."],
    "mining challenges": ["Mining faces challenges such as resource depletion, regulatory compliance, and community engagement.", "Innovation and technology play a role in addressing these challenges."],
    "mining benefits": ["Mining contributes to economic development through job creation and revenue generation.", "It provides essential raw materials for various industries, including construction and manufacturing."],
    "mining and renewable energy": ["Mining is also connected to the renewable energy sector as minerals like lithium and rare earth elements are used in batteries and wind turbines.", "This intersection between mining and renewable energy is vital for the transition to a greener future."],
	"what are mining and renewable energy": ["Mining is also connected to the renewable energy sector as minerals like lithium and rare earth elements are used in batteries and wind turbines.", "This intersection between mining and renewable energy is vital for the transition to a greener future."],
    "mining acts": ["Mining acts are laws that regulate mining activities and provide guidelines for responsible mining.", "They cover issues such as permits, environmental impact assessments, and worker safety."],
    "mining regulations": ["Mining regulations are specific rules and guidelines derived from mining acts.", "They detail procedures and requirements for different aspects of mining operations."],
    "mining permits": ["Mining permits are legal documents that grant the right to extract minerals from a specific area.", "They are issued based on compliance with mining laws and environmental regulations."],
    "mining safety regulations": ["Mining safety regulations are laws that focus on ensuring the safety of miners and mining operations.", "They include rules for safety equipment, emergency procedures, and inspections."],
    "environmental impact assessment mining": ["Environmental impact assessment (EIA) in mining is a process to evaluate and mitigate the environmental effects of mining projects.", "It helps ensure responsible and sustainable mining practices."],
    "mining community engagement": ["Community engagement in mining involves consulting and collaborating with local communities affected by mining activities.", "It's essential for addressing community concerns and fostering positive relationships."],
    "mining land reclamation": ["Mining land reclamation is the process of restoring mined areas to their natural state or suitable for other land uses.", "It's often a legal requirement to minimize the long-term environmental impact of mining."],
    "mining taxation": ["Mining taxation laws govern how mining companies are taxed on their profits and mineral resources.", "They may include corporate income tax, royalties, and other taxes."],
    "mining export regulations": ["Mining export regulations dictate how minerals can be exported from a country.", "They may involve export duties, export quotas, or restrictions on certain minerals."],

    // Handle similar questions asked in different ways
    "hello keywords":["hello","hi","good morning","good afternoon","good night","good evening"],
    "mining companies keywords":["mining companies","what are mining companies"],
    "mining equipment keywords":["mining equipment","what are mining equipment","name the mining equipment"],
    "mining regulations keywords":["mining regulations","what are mining regulations","what are the mining regulations","Name the mining regulations"],
    "mining and sustainability keywords":[ "What is the connection between mining and sustainability","How does mining affect the environment in terms of sustainability", "What are some sustainable mining practices", "How does mining contribute to sustainable development", "Is it possible to extract resources responsibly in mining", "How can mining companies practice environmental stewardship"],
    "mining challenges keywords":["what are the mining challenges","mining challenges","what are the challenges in mining"],
    "mining benefits keywords":["mining benefits","what benefits can anyone get from mining","what benefits can anyone get"],
    "mining and renewable energy keywords":["mining and renewable energy","what are mining and renewable energy"],
    "mining acts keywords": ["mining acts", "laws for mining", "legal regulations for mining"],
    "mining regulations keywords": ["mining regulations", "rules for mining", "mining industry guidelines"],
    "mining permits keywords": ["mining permits", "mining licenses", "permission for mining"],
    "mining safety regulations keywords": ["mining safety regulations", "miner safety rules", "worker protection in mining"],
    "EIA mining keywords": ["EIA mining", "environmental impact assessment in mining", "mining project environmental evaluation"],
    "community engagement mining keywords": ["community engagement mining", "mining community consultation", "engaging with local communities in mining"],
    "land reclamation mining keywords": ["land reclamation mining", "restoring mined land", "rehabilitation of mining areas"],
    "mining taxation keywords": ["mining taxation", "taxes for mining companies", "mining industry tax laws"],
    "export regulations mining keywords": ["export regulations mining", "exporting minerals rules", "mining export policies"]
};

/**
 * Returns the current datetime for the message creation.
 */
function getCurrentTimestamp() {
	return new Date();
}

/**
 * Renders a message on the chat screen based on the given arguments.
 * This is called from the `showUserMessage` and `showBotMessage`.
 */
function renderMessageToScreen(args) {
	// local variables
	let displayDate = (args.time || getCurrentTimestamp()).toLocaleString('en-IN', {
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	});
	let messagesContainer = $('.messages');

	// init element
	let message = $(`
	<li class="message ${args.message_side}">
		<div class="avatar"></div>
		<div class="text_wrapper">
			<div class="text">${args.text}</div>
			<div class="timestamp">${displayDate}</div>
		</div>
	</li>
	`);

	// add to parent
	messagesContainer.append(message);

	// animations
	setTimeout(function () {
		message.addClass('appeared');
	}, 0);
	messagesContainer.animate({ scrollTop: messagesContainer.prop('scrollHeight') }, 300);
}




function showUserMessage(message, datetime) {
	renderMessageToScreen({
		text: message,
		time: datetime,
		message_side: 'right',
	});
}


function showBotMessage(message, datetime) {
	renderMessageToScreen({
		text: message,
		time: datetime,
		message_side: 'left',
	});
}


$('#send_button').on('click', function (e) {
    const userMessage = $('#msg_input').val().trim().toLowerCase();
    if (userMessage !== '') {
        showUserMessage(userMessage);
        $('#msg_input').val('');

        setTimeout(function () {
            // Check if the user's message matches any keywords
            let matchedQuestion = null;
            for (const question in responses) {
                const keywords = responses[question + " keywords"];
                if (keywords && keywords.some(keyword => userMessage.includes(keyword))) {
                    matchedQuestion = question;
                    break;
                }
            }

            if (matchedQuestion) {
                // Provide the response associated with the matched question
                const responseArray = responses[matchedQuestion];
                const randomIndex = Math.floor(Math.random() * responseArray.length);
                showBotMessage(responseArray[randomIndex]);
            } else {
                // If no match is found, provide a default response
                showBotMessage("I'm not sure about that. Ask something else.");
            }
        }, 300);
    }
});




$(window).on('load', function () {
	showBotMessage('Hello there! Type in a message.');
});
