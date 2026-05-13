<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

const { t } = useI18n()

const form = ref({
  name: '',
  email: '',
  message: ''
})

const submitting = ref(false)

const onSubmit = async () => {
  submitting.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  submitting.value = false
  ElMessage.success('Message sent successfully! thank you.')
  form.value = { name: '', email: '', message: '' }
}
</script>

<template>
  <div class="contact-container container">
    <div class="contact-grid">
      <div class="contact-info">
         <h1>{{ t('contact.title') }}</h1>
         <p class="subtitle">{{ t('contact.subtitle') }}</p>
         <div class="info-list">
           <div class="info-item">
             <el-icon><Message /></el-icon>
             <span>1823494260@qq.com</span>
           </div>
           
           <div class="info-item socials">
             <a href="#" class="social-link github"><el-icon><Platform /></el-icon> Github</a>
           </div>
         </div>
      </div>
      
      <div class="contact-form-wrapper">
         <el-card class="form-card">
           <h2>发送消息</h2>
           <el-form label-position="top">
             <el-form-item label="名字">
               <el-input v-model="form.name" placeholder="你的名字" />
             </el-form-item>
             <el-form-item label="邮箱">
               <el-input v-model="form.email" placeholder="你的邮箱" />
             </el-form-item>
             <el-form-item label="消息">
               <el-input
                  v-model="form.message"
                  type="textarea"
                  :rows="4"
                  placeholder="你想说什么？"
                />
             </el-form-item>
             
             <el-button type="primary" class="submit-btn" :loading="submitting" @click="onSubmit">
               发送消息
             </el-button>
           </el-form>
         </el-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-container {
  padding-top: 60px;
  min-height: 80vh;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.contact-info h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 20px;
  background: black;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.2rem;
  color: var(--el-text-color-secondary);
  margin-bottom: 40px;
  line-height: 1.6;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: var(--el-text-color-regular);
}

.socials {
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  margin-top: 40px;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-size: 1.1rem;
  color: var(--el-text-color-primary);
  transition: transform 0.2s, color 0.2s;
}

.social-link:hover {
  color: var(--primary-color);
  transform: translateX(5px);
}

.form-card {
  padding: 20px;
  border-radius: 16px;
  box-shadow: var(--el-box-shadow-light);
  border: 1px solid var(--el-border-color-lighter);

  
}

.submit-btn {
  width: 100%;
  margin-top: 10px;
  height: 45px;
  font-size: 1.1rem;
}



@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>
