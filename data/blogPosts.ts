export interface BlogPost {
  slug: string;
  category: string;
  date: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  imageAlt: string;
  readMoreLink: string;
  references?: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "understanding-cbt-tf-cbt",
    category: "Therapy",
    date: "January 2025",
    title: "Understanding CBT & TF-CBT",
    description: "How CBT and TF-CBT Work: Empowering Change and Healing",
    content: `Cognitive Behavioral Therapy (CBT) is a structured, evidence-based talk therapy designed to help you identify the connection between your thoughts, feelings, and behaviors. In CBT, you'll learn to notice unhelpful thought patterns (for example, "I always mess up," or "I'll never get better"), challenge them, and replace them with more constructive thoughts. This helps reduce distress, improve coping skills, and create lasting change.

CBT is not limited to mental health disorders—it's also effective for life-transitions, relationship stress, grief, and adjustment concerns.

Trauma-Focused CBT (TF-CBT) is a specific adaptation of CBT used for individuals (often youth but also adults) who have experienced trauma, abuse, or significant loss. It integrates traditional CBT techniques (cognitive restructuring, behavioral skills) with trauma-specific elements like gradual exposure, caregiver involvement (when applicable), and safety/re-connection work.

Benefits of TF-CBT:
• Reduces trauma reminders, nightmares, or avoidance behaviors.
• Builds emotional regulation & safety.
• Helps reshape beliefs about self ("I am safe," "I am worthy"), others ("I can trust again"), and the world ("I have control in my life").

When it's used: After major events like accidents, abuse, combat exposure, or long-term relational trauma.

How it integrates with care: At Find Your Light Psychiatry, we combine medication management (when needed) with CBT/TF-CBT, lifestyle supports, and telepsychiatry, to create a holistic healing plan.

Key takeaways:
• Therapy doesn't mean endless talking—it means actively learning tools to change your internal narrative and your responses.
• Whether you're coping with anxiety, relationship issues, adjustment to divorce, trauma, or a life transition—CBT/TF-CBT offers a practical path forward.
• If you're ready to learn skills, see change, and find your light again—reach out and let's create a plan together.`,
    imageUrl: "/images/articles/therapy-notebook.jpg",
    imageAlt: "A living room with two chairs and a plant",
    readMoreLink: "https://www.apa.org/ptsd-guideline/patients-and-families/cognitive-behavioral",
    references: [
      "https://www.apa.org/ptsd-guideline/patients-and-families/cognitive-behavioral",
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC3116969/"
    ]
  },
  {
    slug: "adult-adhd-what-to-know",
    category: "ADHD",
    date: "January 2025",
    title: "Adult ADHD – What to Know, How to Treat",
    description: "Adult ADHD: Recognition, Treatment, and Thriving with a Plan",
    content: `Although many people assume ADHD is only a childhood condition, it often persists or emerges in adulthood—especially when life demands increase (work, relationships, family). According to the Centers for Disease Control and Prevention (CDC), adult treatment typically involves a combination of medication, behavioral strategies, and therapy.

What adult ADHD might look like:
• Persistent difficulty focusing or staying on task in work or home settings
• Impulsivity (speaking or acting without thinking)
• Disorganization, poor time management
• Relationship or adjustment problems due to chronic inattention/over-activity

When ADHD occurs with anxiety, mood issues, or relationship/adjustment stress, comprehensive care is essential.

Evidence-based treatment approaches:
• Medication: Stimulant and non-stimulant options remain first-line.
• Therapy & CBT: CBT tailored for adult ADHD (skill building, compensatory strategies, self-regulation) shows good support.
• Lifestyle & support: Structure, routine, organizational coaching, relationship/adjustment counseling (especially during transitions like divorce, job change).

At Find Your Light Psychiatry, we specialize in helping adults with ADHD integrate medication, CBT, relationship support, and lifestyle interventions so you're not just "managing," you're thriving.

Why seek help now:
• Untreated ADHD in adults often impacts self-esteem, relationships, work performance, and life satisfaction.
• With tailored therapy and medication, many adults experience improved focus, fewer impulsive behaviors, better relationship functioning, and stronger sense of control.

Call to action:
If you've always felt "different," struggled to keep up despite your best efforts, or are navigating relationship/adjustment issues alongside focus challenges—let's collaborate on a clear, individualized plan. Reach out to schedule your evaluation and take the first step toward clarity, connection, and purpose.`,
    imageUrl: "/images/articles/adhd-focus.jpg",
    imageAlt: "Man wearing headphones plays air guitar at desk - symbolizing focus and productivity",
    readMoreLink: "https://www.cdc.gov/adhd/articles/adhd-across-the-lifetime.html",
    references: [
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC6494390/",
      "https://www.cdc.gov/adhd/articles/adhd-across-the-lifetime.html"
    ]
  },
  {
    slug: "navigating-adjustment-and-change",
    category: "Adjustment",
    date: "January 2025",
    title: "Navigating Adjustment & Change",
    description: "When Life Shifts: Understanding Adjustment Disorders and Healing the Transition",
    content: `Change is inevitable—whether it's a new job, relocation, relationship shift, or loss. For many, these transitions are temporary hiccups. But if you find yourself struggling to cope, with emotional distress, impaired functioning, or prolonged symptoms, you may be experiencing an Adjustment Disorder (AD). Research shows AD is a maladaptive reaction to identifiable stressors, with symptoms such as rumination, preoccupation, sleep disturbance, or failure to adapt.

Key Signs:
• Persistent worry or ruminating about the change
• Difficulty sleeping or concentrating
• Feelings of sadness, anxiety, irritability, or avoidance of responsibilities
• Noticeable impact on work, relationships, or daily life

What helps:
• Early recognition and validation—realizing "this is more than just normal adjustment."
• Therapies like Cognitive Behavioral Therapy (CBT) and internet-delivered CBT (iCBT) have shown promise for AD.
• Supportive lifestyle changes: structure, routine, connection, mindfulness.
• In context of telepsychiatry (like what we offer at Find Your Light Psychiatry), combining medication (if needed) + therapy + holistic supports can promote resilience and adaptation.

Why it matters:
Untreated AD can evolve into more severe mood or anxiety disorders. Recognizing and treating it early helps you restore balance, regain confidence, and move forward.`,
    imageUrl: "/images/articles/new-path.jpg",
    imageAlt: "Silhouette of person standing on rock surrounded by body of water - symbolizing new beginnings and celebration",
    readMoreLink: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6678970/",
    references: [
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC6678970/",
      "https://emedicine.medscape.com/article/2192631-overview"
    ]
  },
  {
    slug: "healing-after-divorce",
    category: "Relationships",
    date: "January 2025",
    title: "Healing After Divorce & Relationship Loss",
    description: "When Relationships End: Divorce, Loss & Mental Health — A Path to Renewal",
    content: `Ending a relationship or marriage often brings profound emotional, psychological, and practical stressors. Research has found that those experiencing Divorce are at increased risk for anxiety, depression, social isolation, and poorer health outcomes. For example, one multinational study found a wide association between mental disorders and subsequent divorce.

Common Challenges After Divorce:
• Loss of identity or routine
• Grief over what was and uncertainty about what will be
• Relationship and co-parenting stress, financial changes, social isolation
• Feelings of failure, shame, or conflict

How care helps:
• Therapeutic support: CBT techniques to process feelings, rebuild narratives, and foster self-compassion.
• Medication may be appropriate when depression or anxiety are persistent.
• Telepsychiatry provides flexible access during such transitions.
• Focusing on growth not just survival—reclaiming self, rediscovering purpose.

Hope and Renewal:
While divorce is stressful, it also offers an opportunity: to reevaluate, heal, and reshape your life around what truly matters. With compassionate, evidence-based care (like at Find Your Light Psychiatry), you can move from fragmentation toward renewal.`,
    imageUrl: "/images/articles/healing-solo.jpg",
    imageAlt: "Person wearing silver-colored ring with black gemstone - symbolizing reflection and healing",
    readMoreLink: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4397145/",
    references: [
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC4397145/",
      "https://www.ncbi.nlm.nih.gov/articles/PMC7734469/"
    ]
  },
  {
    slug: "relationship-resilience-after-trauma",
    category: "Relationships",
    date: "January 2025",
    title: "Strengthening Relationships After Trauma & Life Stress",
    description: "Relationship Resilience: Navigating Post-Traumatic, Post-Change Connection & Growth",
    content: `Major life stressors—trauma, loss, divorce, relocation—don't just affect individuals; they often impact relationships too. Whether you're healing from trauma or adjusting to life shifts, relationship struggles may surface as mistrust, conflict, avoidance, or emotional distance. Research shows that interpersonal stressors and trauma increase risk for separation and can complicate mental health.

What to watch for:
• Increased conflict, withdrawal, or emotional numbing between partners
• Difficulty re-establishing intimacy, communication breakdown, or trust issues
• Feeling disconnected even with loved ones, or turning to maladaptive coping (work, substances, avoidance)

Approaches to healing:
• Therapy (TF-CBT if trauma is involved) plus relational interventions.
• Medication management when mood/anxiety symptoms interfere with relational functioning.
• Psychoeducation about how trauma or change affects the brain, emotions, attachment, and chemistry.
• Telepsychiatry makes consistent care realistic—even during busy or transitional phases.

Invitation to wellness:
Relationships can be a source of healing—not just challenges. With intentional support, you and your partner (or you individually) can rebuild connection, communication, meaning, and hope.`,
    imageUrl: "/images/articles/relationship-support.jpg",
    imageAlt: "Silver-colored ring - symbolizing connection and support",
    readMoreLink: "https://link.springer.com/article/10.1007/s44202-024-00272-w",
    references: [
      "https://link.springer.com/article/10.1007/s44202-024-00272-w",
      "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0293285"
    ]
  },
  {
    slug: "seasonal-affective-disorder-pnw",
    category: "Seasonal",
    date: "January 2025",
    title: "Seasonal Affective Disorder in the Pacific Northwest",
    description: "Learn how shorter winter days affect mood, energy, and sleep — and discover how light therapy, CBT, and vitamin D can restore balance.",
    content: `Understanding the Pacific Northwest Winter Blues

If you've noticed your mood dip as the gray skies settle in, you're not alone. The Pacific Northwest's long, dark winters can significantly affect mental well-being. This pattern—called Seasonal Affective Disorder (SAD)—is a type of depression linked to shorter daylight exposure that disrupts the body's internal clock and serotonin levels.

When daylight decreases, melatonin (which regulates sleep) increases, and serotonin (which influences mood) declines. The result: fatigue, oversleeping, weight gain, and persistent sadness that often lifts in spring or summer.

Recognizing the Symptoms of SAD
• Low mood or irritability
• Fatigue and difficulty waking
• Increased appetite or carbohydrate cravings
• Oversleeping
• Withdrawal from social activities
• Difficulty concentrating

Evidence-Based Treatments That Work

1. Light Therapy
Exposure to a 10,000 lux lightbox for about 20–30 minutes in the morning can significantly improve symptoms by regulating melatonin and serotonin.

2. Cognitive Behavioral Therapy for SAD (CBT-SAD)
CBT-SAD teaches you to challenge negative thoughts about winter and replace them with positive coping patterns and activity scheduling.

3. Vitamin D Supplementation
Low sunlight means reduced vitamin D, which has been linked to depression. Ask your provider about checking levels and supplementing as needed.

4. Medication Management
Antidepressants such as SSRIs or SNRIs may be recommended if symptoms persist or interfere with daily life.

Living with Light and Intention
Simple lifestyle changes—like walking outdoors during daylight, opening blinds, and maintaining consistent sleep—can enhance mood. Surrounding yourself with light, both physically and emotionally, helps restore balance.`,
    imageUrl: "/images/articles/seasonal-light.jpg",
    imageAlt: "The sun shines through the branches of a pine tree - winter sunlight",
    readMoreLink: "https://www.nimh.nih.gov/health/publications/seasonal-affective-disorder",
    references: [
      "https://www.nimh.nih.gov/health/publications/seasonal-affective-disorder",
      "https://www.health.harvard.edu/blog/seasonal-affective-disorder-bring-on-the-light-201212215663"
    ]
  },
  {
    slug: "sleep-and-mood-connection",
    category: "Sleep",
    date: "January 2025",
    title: "Sleep & Mood: Why Rest Matters for Mental Health",
    description: "Explore how sleep impacts anxiety, depression, and emotional health—and learn evidence-based tips for better rest.",
    content: `The Vital Connection Between Sleep and Mental Health

Sleep is the body's reset button. When disrupted, it affects serotonin, dopamine, and cortisol—the same neurotransmitters that influence mood and anxiety. Poor sleep can intensify symptoms of depression, irritability, and stress, creating a frustrating cycle of exhaustion and emotional instability.

Common Signs of Sleep-Related Mood Disruption
• Difficulty falling or staying asleep
• Racing thoughts at night
• Daytime fatigue or low motivation
• Heightened anxiety or irritability
• Feeling "tired but wired"

Strategies to Improve Sleep and Mental Wellness

1. Maintain a Consistent Sleep Schedule
Wake up and go to bed at the same time daily, even on weekends. This reinforces your body's circadian rhythm.

2. Limit Screen Time Before Bed
Blue light from devices suppresses melatonin production—try reading, journaling, or meditation instead.

3. Reduce Caffeine and Alcohol
Caffeine lingers for hours, while alcohol disrupts REM sleep. Switch to herbal teas after noon.

4. Cognitive Behavioral Therapy for Insomnia (CBT-I)
CBT-I is a structured approach that helps identify unhelpful thoughts about sleep ("I'll never fall asleep") and replaces them with balanced perspectives and healthier habits.

5. Medication & Integrative Care
Sometimes, short-term sleep aids or anxiety management medications help reset your sleep cycle when combined with therapy.

Restoring Mind-Body Harmony
When you prioritize rest, your mood stabilizes, focus sharpens, and emotional resilience grows. True healing requires both mind and body alignment—and that starts with restorative sleep.`,
    imageUrl: "/images/articles/sleep-rest.jpg",
    imageAlt: "Woman in white tank top sitting on bed - symbolizing rest and peace",
    readMoreLink: "https://www.sleepfoundation.org/mental-health",
    references: [
      "https://www.sleepfoundation.org/mental-health",
      "https://www.nimh.nih.gov/health/publications/sleep-and-depression"
    ]
  },
  {
    slug: "medication-and-mindfulness",
    category: "Mindfulness",
    date: "January 2025",
    title: "How Medication & Mindfulness Work Together",
    description: "Discover how mindfulness and medication together enhance emotional regulation, clarity, and healing.",
    content: `Two Paths, One Purpose: Healing

In psychiatry, medication and mindfulness may seem like opposites—one biological, the other spiritual. Yet when combined, they create a powerful foundation for healing. Medication balances brain chemistry, while mindfulness builds emotional awareness and presence.

How Medication Supports Mindfulness

Psychiatric medications—like antidepressants, mood stabilizers, and anxiolytics—can ease the symptoms that make mindfulness hard to practice. When intrusive thoughts, panic, or depression calm, space opens for stillness and self-reflection.

How Mindfulness Strengthens Medication Outcomes

Research shows that mindfulness-based interventions (MBIs) reduce relapse rates in depression and anxiety by training the brain to respond rather than react. Practices like deep breathing, guided imagery, or body scanning can improve focus, reduce stress, and enhance medication adherence.

Mindfulness Skills to Try:
• Grounding: Name 3 things you can see, hear, and feel right now.
• Box Breathing: Inhale 4 counts, hold 4, exhale 4, hold 4.
• Compassion Meditation: Direct kindness toward yourself and others.

Integrating Both in Practice
At Find Your Light Psychiatry, we often blend mindfulness-based therapies with medication management, helping clients heal through both science and self-awareness.`,
    imageUrl: "/images/articles/mindfulness-meditation.jpg",
    imageAlt: "Woman doing yoga meditation on brown parquet flooring",
    readMoreLink: "https://www.apa.org/monitor/2012/07-08/ce-corner",
    references: [
      "https://www.apa.org/monitor/2012/07-08/ce-corner",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3679190/"
    ]
  }
];

