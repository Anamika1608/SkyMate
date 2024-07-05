const Unique = () => {
    const features = [
      {
        icon: '🏃‍♂️',
        title: 'Activity Planner',
        description: 'Get personalized outdoor activity suggestions.'
      },
      {
        icon: '🫁',
        title: 'Health Alerts',
        description: 'Get info about affecting allergies, air quality, and overall wellness.'
      },
      {
        icon: '💡',
        title: 'Energy Saver',
        description: 'Discover daily tips to reduce energy consumption and costs.'
      },
      {
        icon: '🚨',
        title: 'Weather Prep Guide',
        description: 'Access guides for various weather emergencies.'
      },
      {
        icon: '📸',
        title: 'Weather Gallery',
        description: 'Share and explore user-submitted weather photos from around the world.'
      }
    ];
  
    return (
      <section>
        <h2>Key Features</h2>
        <div>
          {features.map((feature, index) => (
            <div key={index} >
              <span >{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };


export default Unique;