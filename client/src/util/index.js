export const RGB_Linear_Shade=(p,c)=>{
	var i=parseInt,r=Math.round,[a,b,c,d]=c.split(","),P=p<0,t=P?0:255*p,P=P?1+p:1-p;
	return"rgb"+(d?"a(":"(")+r(i(a[3]=="a"?a.slice(5):a.slice(4))*P+t)+","+r(i(b)*P+t)+","+r(i(c)*P+t)+(d?","+d:")");
}
// When blending two alpha channels, they use Linear Blending for the alpha channel blend.
// Blending percentage (p) range is 0.0 to 1.0. Shading percentage range is -1.0 to 1.0, negative p shades to black, positive p shades to white.
// If you want to shade and have the alphas blend (instead of passing straight thru), you will have to use a blend function and pass in white or black (with an alpha channel) as your c1 color.