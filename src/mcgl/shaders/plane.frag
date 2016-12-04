precision mediump float;


uniform float alpha;

void main() {
  vec3 color = vec3(.2,.2,.2);

  gl_FragColor = vec4(color, 1.0);
  gl_FragColor *= .1;
}
