//info management script

/* FOR USERS:
 * A majority of descriptions are taken or adapted from the bayfox website, bayfoxcove.xyz.
 * Any changes from listed descriptions there are purely for clarity, and should enhance but not change the meaning of the category.
 * If you feel any descriptions provided by this tool are inaccurate to the categories defined on bayfoxcove.xyz,
 * please contact vampycat237. Contact information can be found at vampycat237.github.io.
 * 
 * Vampycat237 is not responsible for the contents of any projects other than those of their own creation,
 * so if you are having issues with a project that is managed by someone else, please contact the project owner.
 */

/* FOR DEVELOPERS:
 * The infoStrings object holds the descriptions for every option that exists for your users to choose from when
 * counting using your tool.
 * 
 * Knowing what exactly the various options mean - and being able to pull that information up without leaving the
 * page - is very helpful, especially with complicated art redeeming systems.
 * It's reccomended to pull your infoStrings directly from official sources and to use the same wording as the
 * site, unless the language of the site is unclear, in which you should attempt to clarify further.
 * 
 * Make sure you do not describe your options in a way that does not align with how the art is actually redeemed,
 * though, as your tool will then become an inconvenience instead of a convenience, which is literally the opposite
 * of what this is for.
 */

/*function showInfo(str) {
	info.content.innerHTML = str;
	info.container.style.display = "flex";
}

function hideInfo() {
	info.container.style.display = "none";
}*/

const infoStrings = {
	elmnt: document.getElementById("info"),

	image: "The image window displays the artwork you are counting if you provide it a link to the image! This is an optional step, but might be helpful when counting shells so you can have everything on the same screen.",

	media: {
		flatcolor: "2d artwork that has been colored.",
		grayscale: "2d artwork that has been 'colored' in only grayscale values.",

		full3d: "A 3d model that is 'in the round' - if you were to turn it around, it would look like a real-world fox from all angles. This does not require realism.",
		flat3d: "A 3d model that is not 'in the round' - if you were to turn it around, it would not look like a real-world fox from every angle. A good example would be a 3d model with depth akin to a relief carving.",

		paper: "A craft made from paper. This could be origami, paper standees, a collage, or anything else you might make using paper!",
		food: "Confections is a catch-all for any edible creations. This could mean frosting/icing art on cupcakes, cakes, or cookies, or some sort of 3d representation of a fox, or anything else you make using food!",
		clay: "Artwork made of clay or made in a mold. This would include clay, pottery, resin, rubber band sculpture/models, and more!",
		fabric: "Fabric crafts would include anything you make using fabric or yarn of a bayfox. Some examples would be a crochet plush or a fursuit."
	},

	size: {
		overview: "Crafts are evaluated not only on medium and coverage, but also their size, as it is much more difficult to make a large physical object than a smaller sized physical object in most cases. The sizes Bayfoxes use are 'model' and 'large'.",
		model: "This craft is about the size of or smaller than an average banana.",
		large: "This craft is significantly larger than an average banana."
	},

	coverage: {
		overview: "'Coverage' refers to how much of the character is depicted in your art. Common words for this are terms like 'headshot' and 'fullbody.'",
		headshot: "Only the head of the Bayfox, and maybe neck, is visible.",
		halfbody: "Anywhere from the Bayfox’s head and chest to a bit of the hindlegs is visible.",
		fullbody: "Entire Bayfox’s body is visible. It will still count as a fullbody if say, only the tips of toes are not visible.",
		mini: "Art that is small or simplified and lacking the details that a normal fullbody or headshot may contain. The lineless value does not apply to minis. When creating 'grind sheets' poses must be somewhat unique!"
	},

	base: "'Base values' represent the starting values for the art, essentially. Their value is based on the medium you have done the artwork in, how much of the bayfox you have drawn (coverage), and in the case of crafts the size of the artwork.",

	stackable: "'Stackable values' are bonuses you get for putting in more effort or polish in your work. This is how you get extra shells for shading, animating, lineless art, or fully colored lineart.",

	lines: {
		colorlines: "colorlines TODO",
		lineless: "lineless TODO"
	},

	shading: {
		minimal: "Baycove defines minimal shading as 'very small shadows, such as used to define a limb in the back.'",
		basic: "A single layer of shading and/or very minimal highlights.",
		complex: "Shading with multiple layers of highlights and shadows.",
		painting: "Multiple layers of mixed highlights and shadows creating a fluid texture."
	},

	animation: {
		overview: "There are two categories for animation in Baycove: tween/puppet animation, and hand-drawn animation. Additionally, this category is specifically for character animation, not backgrounds.",
		tweens: "Tween or puppet animations would include animations that primarily consist of moving and/or rotating static pieces of art. For instance, a head bob where the head moves straight up and down, or a puppet animation where three seperate arm sprites make up one arm that is moved with simulated 'bones.'",
		handdrawn: "Hand-drawn animations would include animations that primarily consist of uniquely drawn images and frames."
	},

	tweens: {
		simple: "A simple tween consists of minimal movement, like a small headbob.",
		complex: "A complex tween has busy movement, consisting of three or more limbs in action.",
		fluid: "A fluid tween is an extremely complex tween animation that involves most or all limbs on the body."
	},
	handdrawn: {
		easy: "Easy animation is when one drawing is reused with minimal changes per frame, such as an eye blink or ear twitch.",
		simple: "A simple animation uses the same pose with minimal changes, such as a tail wag or idle animation.",
		complex: "Drawing each pose and position uniquely, such as in a walk cycle, is considered complex animation."
	},

	characterBonus: {
		botm: "Each user that is not the owner of the Bayfox can draw gift art of the Bay of the Month to earn an additional 100 shells to their work. Commissions and art trades of the Bay of the Month cannot be redeemed for Bay of the Month bonus shells.",
		kit: "Artwork of official Baykits is counted at 50% of normal shell rates. Unofficial Baykit concepts of approved adult Bays are not redeemable."
	},
	
	pets : { //TO BE IMPLEMENTED
		flat : "A flat rate with a pet means that they have a specific amount of shells they will give every time you draw them. These are factored in by the Bay Art Counter by adding them in counting.",
		percentage : "A percentage with a pet means that they will reward a bonus of a set percentage of the total art (before other bonuses). For instance, if your art is worth 100 shells without pets, and your pet has a 5% bonus, that would add on 5 shells (5% of 100). The Bay Art Counter handles these by adding up the totals, then calculating the individual bonuses each percentage pet will add, then adding that to the total.",
		rng : "The Bay Art Counter cannot factor in pets with rewards based on RNG, but it does add a 'pet rolls' comment in the counting. This is because RNG bonuses must be rolled by bayfox mods."
	}
}