import React from 'react';

function Card1({ title, description, release_date, image }) {
return (
<div className="bg-white p-4 rounded-lg shadow">
<img src={image} alt={title} className="w-full h-40 object-cover rounded" />
<h2 className="text-xl font-semibold mt-2">{title}</h2>
<p className="text-sm text-gray-600">{description}</p>
<p className="text-xs text-gray-400 mt-1">Release Date: {release_date}</p>
</div>
);
}

export default Card1;