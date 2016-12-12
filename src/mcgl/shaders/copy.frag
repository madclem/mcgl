// copy.frag

#define SHADER_NAME COPY_FRAGMENT

precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D texture;

void main(void) {
    gl_FragColor = texture2D(texture, vTextureCoord);
    // gl_FragColor = vec4(vTextureCoord, 0.0, 1.0);
}
